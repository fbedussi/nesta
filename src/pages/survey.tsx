import { useTranslation } from "react-i18next";
import { Link } from "../router";

export function Survey() {
	const { t } = useTranslation();

	return (
		<div>
			<p>{t("survey")}</p>
			<Link href="/">{t("proceed")}</Link>
		</div>
	);
}
