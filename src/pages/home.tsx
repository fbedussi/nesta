import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

	const [eggState, setEggState] = useState<"idle" | "hatched" | "pulsing">(
		"idle",
	);

	useEffect(() => {
		if (!surveyCompleted) {
			navigate("/intro");
		}
	}, [surveyCompleted]);

	useEffect(() => {
		if (eggState !== "pulsing") return;
		const timer = setTimeout(() => setEggState("hatched"), 1800);
		return () => clearTimeout(timer);
	}, [eggState]);

	const handleEggClick = () => {
		if (eggState === "idle") setEggState("pulsing");
	};

	return (
		<div className="page-wrapper outer-page-container">
			<div className="inner-page-container">
				{!birdName && eggState !== "hatched" ? (
					<button
						type="button"
						onClick={handleEggClick}
						className={`${styles["idle-egg"]} ${eggState === "pulsing" ? styles["pulsing-egg"] : ""}`}
					>
						🥚
					</button>
				) : (
					<div className={styles["hatched-egg-wrapper"]}>
						<span className={styles["hatched-egg"]}>🐣</span>
						{birdName ? (
							<div className={styles.name}>{birdName}</div>
						) : (
							<form
								className={styles.form}
								onSubmit={async (ev) => {
									ev.preventDefault();
									const formInput = ev.currentTarget[0] as HTMLInputElement;
									await actions.setBirdName(formInput.value);
								}}
							>
								<label htmlFor="bird-name-input" className={styles.title}>
									{t("nameYourBird")}
								</label>
								<div className={styles.subtitle}>{t("nameHint")}</div>
								<input
									id="bird-name-input"
									type="text"
									placeholder={t("birdNamePlaceholder")}
									className={styles.input}
								/>
								<button type="submit" className="btn">
									{t("confirm")}
								</button>
							</form>
						)}
					</div>
				)}

				<div className={styles.streak}>
					{t("streak")}: {streak}
				</div>
			</div>
			<Menu />
		</div>
	);
}
