import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";
import { resizeImage } from "../libs/image";
import { formatDate } from "../libs/time";
import type { Hand } from "../model";
import { actions, selectors, useStore } from "../store";
import styles from "./take-photo.module.css";

export function TakePhoto() {
	const { t } = useTranslation();

	const [hand, setHand] = useState<Hand>("left");
	const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

	const savedPhotos = useStore(selectors.photos);
	const savedPhotosByHand = savedPhotos.filter((photo) => photo.hand === hand);
	const numberOfSavedPhotos = savedPhotosByHand.length;
	const [selectedSavedPhoto, setSelectedSAvedPhoto] = useState<number | null>(
		null,
	);

	// auto select last added/loaded photo
	useEffect(() => {
		setSelectedSAvedPhoto(numberOfSavedPhotos);
	}, [numberOfSavedPhotos]);

	const disableSaveButton = !uploadedImageFile;

	const imageInputRef = useRef<HTMLInputElement>(null);

	const today = new Date().toISOString().split("T")[0];

	const imageFile =
		uploadedImageFile ||
		(!!selectedSavedPhoto &&
			!!savedPhotosByHand[selectedSavedPhoto - 1] &&
			savedPhotosByHand[selectedSavedPhoto - 1].file);

	return (
		<div className="page-wrapper outer-page-container">
			<div className="inner-page-container">
				<h1 className="visually-hidden">{t("take photo")}</h1>

				{imageFile ? (
					<div className={styles["photo-wrapper"]}>
						<img
							src={URL.createObjectURL(imageFile)}
							alt=""
							className={styles.photo}
						/>
						{!!selectedSavedPhoto &&
							!!savedPhotosByHand[selectedSavedPhoto - 1] && (
								<div className={styles.date}>
									{formatDate(savedPhotosByHand[selectedSavedPhoto - 1].date)}
								</div>
							)}
					</div>
				) : (
					<div className={styles.photo}></div>
				)}

				{!!numberOfSavedPhotos && selectedSavedPhoto && (
					<label className={styles["slider-label"]}>
						{t("scrollPhotos", { numberOfPhotos: numberOfSavedPhotos })}
						<input
							type="range"
							min="1"
							max={numberOfSavedPhotos}
							value={selectedSavedPhoto.toString()}
							onChange={(ev) => {
								const newlySelectedPhoto = Number(ev.currentTarget.value);
								setSelectedSAvedPhoto(newlySelectedPhoto);
							}}
							className={styles.slider}
						/>
					</label>
				)}

				<form
					className={styles.form}
					onSubmit={async (ev) => {
						ev.preventDefault();

						if (!uploadedImageFile) {
							throw new Error("missing image file");
						}
						await actions.addPhoto({
							file: uploadedImageFile,
							alt: t("handImage", { hand, day: today }),
							date: today,
							hand,
						});
						setUploadedImageFile(null);
					}}
				>
					<fieldset className="switch">
						<label htmlFor="left">{t("left")}</label>
						<input
							id="left"
							type="radio"
							name="hand"
							value="left"
							onChange={() => setHand("left")}
							checked={hand === "left"}
						/>
						<label htmlFor="right">{t("right")}</label>
						<input
							id="right"
							type="radio"
							name="hand"
							value="right"
							onChange={() => setHand("right")}
							checked={hand === "right"}
						/>
					</fieldset>
					<input
						hidden
						ref={imageInputRef}
						type="file"
						accept="image/*"
						onChange={async (e) => {
							const file = e.currentTarget.files?.[0];
							if (!file) {
								throw new Error("No image file");
							}

							const resizedImage = await resizeImage(file, 960, 960);

							setUploadedImageFile(resizedImage);
						}}
					/>

					<div>
						<button
							className={styles["shutter-btn"]}
							type="button"
							onClick={() => imageInputRef.current?.click()}
							aria-label={t(uploadedImageFile ? "changeImage" : "pickImage")}
						>
							📸
						</button>
					</div>
					<div>
						<button type="submit" disabled={disableSaveButton} className="btn">
							{t("save")}
						</button>
					</div>
				</form>
			</div>

			<Menu />
		</div>
	);
}
