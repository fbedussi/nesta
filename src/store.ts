import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { PersistStorage, StorageValue } from "zustand/middleware/persist";
import type { Model, Photo } from "./model";

function openDatabase(
	databaseName: string,
	storeName: string,
): Promise<IDBDatabase> {
	const openRequest = indexedDB.open(databaseName, 1);

	openRequest.addEventListener(
		"upgradeneeded",
		(event) => {
			if (event.target instanceof IDBOpenDBRequest) {
				const database = event.target.result;

				if (!database.objectStoreNames.contains(storeName)) {
					database.createObjectStore(storeName);
				}
			}
		},
		{ once: true },
	);

	return promisifyRequest(openRequest);
}

function promisifyRequest<T = undefined>(request: IDBRequest<T>): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

/**
 * Create a persist storage using `IndexedDB`.
 * Handy for persisting non-serializable data.
 * @param databaseName A name of the database.
 * @param storeName A name of the store within the database.
 *
 * @example
 * createStore(
 *   persist(initialState, {
 *     version: 0.1,
 *     name: 'row-key',
 *     storage: createIndexedDBStorage('database-name', 'store-name')
 *   })
 * )
 */
function createIndexedDBStorage<S>(
	databaseName: string,
	storeName: string,
): PersistStorage<S, Promise<void>> {
	return {
		async getItem(name) {
			const database = await openDatabase(databaseName, storeName);
			const objectStore = database
				.transaction(storeName, "readonly")
				.objectStore(storeName);

			return await promisifyRequest<StorageValue<S>>(objectStore.get(name));
		},

		async setItem(name, value) {
			const database = await openDatabase(databaseName, storeName);
			const objectStore = database
				.transaction(storeName, "readwrite")
				.objectStore(storeName);

			await promisifyRequest(objectStore.put(value, name));
		},

		async removeItem(name) {
			const database = await openDatabase(databaseName, storeName);
			const objectStore = database
				.transaction(storeName, "readwrite")
				.objectStore(storeName);

			await promisifyRequest(objectStore.delete(name));
		},
	};
}

const initialState: Model = {
	surveyCompleted: false,
	birdName: "",
	photos: [],
};

export const useStoreWithPersistance = create<
	Model,
	[["zustand/persist", unknown], ["zustand/devtools", never]]
>(
	persist(
		devtools(() => initialState),
		{
			name: "nesta-store",
			version: 0.1,
			storage: createIndexedDBStorage("nesta-db", "nesta-idb-store"),
		},
	),
);

export const useStore = create<Model, [["zustand/devtools", never]]>(
	devtools(() => initialState),
);

export const selectors = {
	surveyCompleted: (state: Model) => state.surveyCompleted,
	birdName: (state: Model) => state.birdName,
	photos: (state: Model) => state.photos,
	streak: (state: Model) => new Set([...state.photos.map(getShotDay)]).size,
};

export const actions = {
	setSurveyCompleted: () => useStore.setState({ surveyCompleted: true }),
	setBirdName: (name: string) => useStore.setState({ birdName: name }),
	addPhoto: (photo: Photo) =>
		useStore.setState((state) => ({ photos: [...state.photos, photo] })),
};

function getShotDay(photo: Photo): string {
	const date = new Date(photo.date);
	return date.toISOString().split("T")[0];
}
