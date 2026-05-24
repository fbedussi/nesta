import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "../router";
import { actions } from "../store";

export function Birth() {
	const { t } = useTranslation();

	useEffect(() => {
		actions.setSurveyCompleted();
	}, []);

	return (
		<div>
			<h1>Birtth</h1>
			<Link href="/">{t("proceed")}</Link>
		</div>
	);
}
