import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Traits } from "../model";
import { Link } from "../router";
import { actions, selectors, useStore } from "../store";

const percentageMap: Record<Traits, number> = {
	stress: 48,
	automatic: 34,
	perfectionist: 18,
};

export function Profile() {
	const { t } = useTranslation();

	const profile = useStore(selectors.profile);

	useEffect(() => {
		actions.setSurveyCompleted();
	}, []);

	return (
		<div>
			<h1>Profilo</h1>

			{!profile ? (
				<div>{t("profileNotFound")}</div>
			) : (
				<>
					<div>{t(`profile_${profile}_description`)}</div>
					<div>{t(`profile_${profile}_message`)}</div>
					<div>
						{t(`percentageOfPeople`)} {percentageMap[profile]}%
					</div>
				</>
			)}

			<div>
				<Link href="/">{t("letsStart")}</Link>
			</div>
		</div>
	);
}
