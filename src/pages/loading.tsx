import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "../router";

export function Loading() {
	const { t } = useTranslation();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate("/profile");
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<div>
			<h1>loading</h1>
			<progress aria-label={t("loading")}></progress>
		</div>
	);
}
