import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";

export function Journey() {
	const { t } = useTranslation();

	return (
		<div className="page-wrapper outer-page-container">
			<div className="inner-page-container">
				<h1>{t("journey")}</h1>
			</div>
			<Menu />
		</div>
	);
}
