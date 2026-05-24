import { useTranslation } from "react-i18next";
import { Link } from "../router";

export function Profile() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>Profilo</h1>
			<Link href="/birth">{t("proceed")}</Link>
		</div>
	);
}
