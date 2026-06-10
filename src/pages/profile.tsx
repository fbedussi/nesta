import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../components/logo";
import type { Traits } from "../model";
import { Link, navigate } from "../router";
import { selectors, useStore } from "../store";
import styles from "./profile.module.css";

const percentageMap: Record<Traits, number> = {
	stress: 48,
	automatic: 34,
	perfectionist: 18,
};

export function Profile() {
	const { t } = useTranslation();

	const profile = useStore(selectors.profile);

	useEffect(() => {
		if (!profile) {
			navigate("/intro");
		}
	}, [profile]);

	return (
		<div className={`page-wrapper ${styles.container}`}>
			<h1 className={styles.title}>{t("profileTitle")}</h1>

			<div className={styles.description}>
				{t(`profile_${profile}_description`)}
			</div>

			<div className={styles.percentage}>
				{t(`percentageOfPeople`)} {profile && percentageMap[profile]}%
			</div>

			<div className={styles["message-wrapper"]}>
				<Logo size={8} iconOnly />
				<div className={styles.message}>{t(`profile_${profile}_message`)}</div>
			</div>

			<div className={styles["cta-wrapper"]}>
				<Link href="/" className="btn">
					{t("letsStart")}
				</Link>
			</div>
		</div>
	);
}
