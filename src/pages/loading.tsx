import { useTranslation } from "react-i18next";
import { Link } from "../router";

export function Loading() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>loading</h1>
			<Link href="/profile">{t("proceed")}</Link>
		</div>
	);
}
