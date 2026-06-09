import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../components/logo";
import { Menu } from "../components/menu";
import { navigate } from "../router";
import { actions, selectors, useStore } from "../store";
import styles from "./home.module.css";

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
		<div className="page-wrapper outer-page-container">
			<div className="inner-page-container">
				<Logo size={8} iconOnly />
				<label className={styles.form}>
					<div className={styles.title}>{t("nameYourBird")}</div>
					<input
						type="text"
						placeholder={t("birdNamePlaceholder")}
						value={birdName}
						onChange={async (ev) =>
							await actions.setBirdName(ev.currentTarget.value)
						}
						className={styles.input}
					/>
				</label>
				<div className={styles.streak}>
					{t("streak")}: {streak}
				</div>
			</div>
			<Menu />
		</div>
	);
}
