import { useTranslation } from "react-i18next";
import { Link } from "../router";

export function Birth() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>Birth</h1>
			<Link href="/">{t("proceed")}</Link>
		</div>
	);
}
