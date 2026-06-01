import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../components/logo";
import { navigate } from "../router";
import styles from "./loading.module.css";

export function Loading() {
	const { t } = useTranslation();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate("/profile");
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<div className={`page-wrapper ${styles.container}`}>
			<div className={styles["loader-and-logo"]}>
				<div className={styles.loader}></div>
				<Logo size={8} iconOnly />
			</div>
			<h1 className={styles.title}>{t("loading")}</h1>
		</div>
	);
}
