import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";

export function Sos() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t("sos")}</h1>
			<Menu />
		</div>
	);
}
