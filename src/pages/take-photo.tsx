import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";
import { useRef, useState } from "react";
import { resizeImage } from "../libs/image";

export function TakePhoto() {
	const { t } = useTranslation();

	const [imageSrc, setImageSrc] = useState<string>("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageLoading, setImageLoading] = useState(false);

	const disableSaveButton = !imageFile;

	const imageInputRef = useRef<HTMLInputElement>(null);

	return (
		<div>
			<h1>{t("take photo")}</h1>

			<form>
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

						setImageLoading(true);

						const resizedImage = await resizeImage(file, 960, 960);

						setImageFile(resizedImage);
						const src = URL.createObjectURL(resizedImage);
						setImageSrc(src);
						setImageLoading(false);
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
