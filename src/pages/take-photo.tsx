import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";
import { resizeImage } from "../libs/image";
import type { Hand } from "../model";
import { actions } from "../store";

export function TakePhoto() {
	const { t } = useTranslation();

	const [hand, setHand] = useState<Hand>("left");
	const [imageSrc, setImageSrc] = useState<string>("");
	const [imageFile, setImageFile] = useState<File | null>(null);

	const disableSaveButton = !imageFile;

	const imageInputRef = useRef<HTMLInputElement>(null);

	const today = new Date().toISOString().split("T")[0];

	return (
		<div>
			<h1>{t("take photo")}</h1>

			<form
				onSubmit={() => {
					actions.addPhoto({
						url: imageSrc,
						alt: t("handImage", { hand, day: today }),
						date: today,
						hand,
					});
				}}
			>
				<fieldset>
					<label>
						<input
							type="radio"
							name="hand"
							value="left"
							onChange={() => setHand("left")}
							checked={hand === "left"}
						/>
						<span>{t("left")}</span>
					</label>
					<label>
						<input
							type="radio"
							name="hand"
							value="right"
							onChange={() => setHand("right")}
							checked={hand === "right"}
						/>
						<span>{t("right")}</span>
					</label>
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
					<button type="button" onClick={() => imageInputRef.current?.click()}>
						{t(imageSrc ? "changeImage" : "pickImage")}
					</button>
				</div>
				<img src={imageSrc} alt="" />
				<div>
					<button type="submit" disabled={disableSaveButton}>
						{t("save")}
					</button>
				</div>
			</form>

			<Menu />
		</div>
	);
}
