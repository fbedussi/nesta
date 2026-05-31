import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../components/menu";
import { navigate } from "../router";
import { actions, selectors, useStore } from "../store";

export function Home() {
	const { t } = useTranslation();
	const surveyCompleted =
		useStore(selectors.surveyCompleted) ||
		window.location.pathname.includes("home");
	const birdName = useStore(selectors.birdName);
	const streak = useStore(selectors.streak);

	useEffect(() => {
		if (!surveyCompleted) {
			navigate("/intro");
		}
	}, [surveyCompleted]);

	return (
		<div>
			<div>disegno uccellino nel nido</div>
			<input
				type="text"
				placeholder={t("birdNamePlaceholder")}
				value={birdName}
				onChange={(ev) => actions.setBirdName(ev.currentTarget.value)}
			/>
			<div>
				{t("streak")}: {streak}
			</div>
			<Menu />
		</div>
	);
}
