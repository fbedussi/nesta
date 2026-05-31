import { useTranslation } from "react-i18next";
import { Logo } from "../components/logo";
import { Promises } from "../components/promises";
import { Link } from "../router";
import styles from "./intro.module.css";

export function Intro() {
	const { t } = useTranslation();

	return (
		<div className={`page-wrapper ${styles.container}`}>
			<Logo size={8} />

			<div className={styles.promisees}>
				<h1 className={styles.title}>{t("ourPromises")}</h1>

				<div className={styles["slider-wrapper"]}>
					<Promises />
				</div>
			</div>

			<Link href="/survey" className="btn">
				{t("introCta")}
			</Link>
		</div>
	);
}
