import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";

export function Journey() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t("journey")}</h1>
			<Menu />
		</div>
	);
}
