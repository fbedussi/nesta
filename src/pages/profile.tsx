import { useTranslation } from "react-i18next";
import { Link } from "../router";
import { selectors, useStore } from "../store";

export function Profile() {
	const { t } = useTranslation();

	const profile = useStore(selectors.profile);
	return (
		<div>
			<h1>Profilo</h1>

			<div>{t(`profile_${profile}_description`)}</div>
			<div>{t(`profile_${profile}_message`)}</div>

			<div>
				<Link href="/birth">{t("proceed")}</Link>
			</div>
		</div>
	);
}
