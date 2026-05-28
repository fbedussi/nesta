import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { PersistStorage, StorageValue } from "zustand/middleware/persist";
import type { Model, Photo, Traits } from "./model";

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
	surveyAnswers: {
		"1": null,
		"2": null,
		"3": null,
		"4": null,
		"5": null,
	},
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
	surveyCompletedPercentage: (state: Model) => {
		const answers = Object.values(state.surveyAnswers);
		const totalQuestions = answers.length;
		const answeredQuestions = answers.filter(
			(answer) => answer !== null,
		).length;

		return Math.round((answeredQuestions / totalQuestions) * 100);
	},
	profile: (state: Model): Traits | undefined => {
		const matrix: Record<string, Record<string, Traits>> = {
			"1": {
				"1": "stress",
				"2": "automatic",
				"3": "perfectionist",
				"4": "automatic",
			},
			"2": {
				"1": "stress",
				"2": "automatic",
				"3": "automatic",
				"4": "perfectionist",
			},
			"3": {
				"1": "stress",
				"2": "stress",
				"3": "perfectionist",
				"4": "automatic",
			},
		};
		const score: Record<Traits, number> = {
			stress: 0,
			automatic: 0,
			perfectionist: 0,
		};

		Object.entries(state.surveyAnswers)
			.slice(0, 3)
			.forEach(([questionId, answerId]) => {
				if (!answerId) {
					return;
				}

				const trait = matrix[questionId][answerId];
				score[trait]++;
			});

		let results = Object.entries(score).toSorted((a, b) => b[1] - a[1]) as [
			Traits,
			number,
		][];
		if (results[0][1] === results[1][1]) {
			const answerId = state.surveyAnswers["1"];

			if (!answerId) {
				return;
			}

			const trait = matrix["1"][answerId];
			score[trait]++;

			results = Object.entries(score).toSorted((a, b) => b[1] - a[1]) as [
				Traits,
				number,
			][];
		}

		return results[0][0];
	},
};

export const actions = {
	setSurveyCompleted: () => useStore.setState({ surveyCompleted: true }),
	setBirdName: (name: string) => useStore.setState({ birdName: name }),
	addPhoto: (photo: Photo) =>
		useStore.setState((state) => ({ photos: [...state.photos, photo] })),
	setSurveyAnswer: (questionId: number, answerId: number) =>
		useStore.setState((state) => ({
			surveyAnswers: {
				...state.surveyAnswers,
				[questionId]: answerId,
			},
		})),
};

function getShotDay(photo: Photo): string {
	const date = new Date(photo.date);
	return date.toISOString().split("T")[0];
}
