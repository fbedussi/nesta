import { useTranslation } from "react-i18next";
import { Link } from "../router";
import styles from "./menu.module.css";

export function Menu() {
	const { t } = useTranslation();

	return (
		<nav className={styles.container}>
			<ul>
				<li>
					<Link href="/" aria-label={t("home")}>
						🏠
					</Link>
				</li>
				<li>
					<Link href="/journey" aria-label={t("journey")}>
						🧭
					</Link>
				</li>
				<li>
					<Link href="/sos" aria-label={t("SOS")}>
						🆘
					</Link>
				</li>
				<li>
					<Link href="/take-photo" aria-label={t("take photo")}>
						📷
					</Link>
				</li>
			</ul>
		</nav>
	);
}
