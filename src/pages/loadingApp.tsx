import { useTranslation } from "react-i18next";
import { Logo } from "../components/logo";
import styles from "./loading.module.css";

export function LoadingApp() {
	const { t } = useTranslation();

	return (
		<div className={`page-wrapper ${styles.container}`}>
			<div className={styles["loader-and-logo"]}>
				<div className={styles.loader}></div>
				<Logo size={8} iconOnly />
			</div>
			<h1 className={styles.title}>{t("loadingApp")}</h1>
		</div>
	);
}
