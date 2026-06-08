import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";
import { resizeImage } from "../libs/image";
import type { Hand } from "../model";
import { actions, selectors, useStore } from "../store";
import styles from "./take-photo.module.css";
import { formatDate } from "../libs/time";

export function TakePhoto() {
	const { t } = useTranslation();

	const [hand, setHand] = useState<Hand>("left");
	const [imageSrc, setImageSrc] = useState<string>("");
	const [imageFile, setImageFile] = useState<File | null>(null);

	const photos = useStore(selectors.photos);
	const photosByHand = photos.filter((photo) => photo.hand === hand);
	const numberOfSavedPhotos = photosByHand.length;
	const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

	// auto select last added photo
	useEffect(() => {
		setSelectedPhoto(numberOfSavedPhotos);
	}, [numberOfSavedPhotos]);

	const disableSaveButton = !imageFile;

	const imageInputRef = useRef<HTMLInputElement>(null);

	const today = new Date().toISOString().split("T")[0];

	const url =
		imageSrc || (!!selectedPhoto && photosByHand[selectedPhoto - 1]?.url);

	return (
		<div className="page-wrapper outer-page-container">
			<div className="inner-page-container">
				<h1 className="visually-hidden">{t("take photo")}</h1>

				{url ? (
					<div className={styles["photo-wrapper"]}>
						<img src={url} alt="" className={styles.photo} />
						{!!selectedPhoto && (
							<div className={styles.date}>
								{formatDate(photosByHand[selectedPhoto - 1]?.date)}
							</div>
						)}
					</div>
				) : (
					<div className={styles.photo}></div>
				)}

				{!!numberOfSavedPhotos && selectedPhoto && (
					<label className={styles["slider-label"]}>
						{t("scrollPhotos")}
						<input
							type="range"
							min="1"
							max={numberOfSavedPhotos}
							value={selectedPhoto.toString()}
							onChange={(ev) => {
								const newlySelectedPhoto = Number(ev.currentTarget.value);
								setSelectedPhoto(newlySelectedPhoto);
								setImageSrc(photosByHand[newlySelectedPhoto - 1]?.url);
							}}
							className={styles.slider}
						/>
					</label>
				)}

				<form
					className={styles.form}
					onSubmit={() => {
						actions.addPhoto({
							url: imageSrc,
							alt: t("handImage", { hand, day: today }),
							date: today,
							hand,
						});
						setImageFile(null);
						setImageSrc("");
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

							setImageFile(resizedImage);
							const src = URL.createObjectURL(resizedImage);
							setImageSrc(src);
						}}
					/>

					<div>
						<button
							className={styles["shutter-btn"]}
							type="button"
							onClick={() => imageInputRef.current?.click()}
							aria-label={t(imageSrc ? "changeImage" : "pickImage")}
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
