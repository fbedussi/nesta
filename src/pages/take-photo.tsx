import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";

export function TakePhoto() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t("take photo")}</h1>
			<Menu />
		</div>
	);
}
