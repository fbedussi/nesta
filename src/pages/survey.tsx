import { useTranslation } from "react-i18next";

export function Survey() {
	const { t } = useTranslation();

	return (
		<div>
			<p>{t("survey")}</p>
			<a href="/">{t("proceed")}</a>
		</div>
	);
}
