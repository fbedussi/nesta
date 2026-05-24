import { useTranslation } from "react-i18next";
import { Link } from "../router";

export function Menu() {
	const { t } = useTranslation();

	return (
		<nav>
			<ul>
				<li>
					<Link href="/">{t("home")}</Link>
				</li>
				<li>
					<Link href="/journey">{t("journey")}</Link>
				</li>
				<li>
					<Link href="/sos">{t("SOS")}</Link>
				</li>
				<li>
					<Link href="/take-photo">{t("take photo")}</Link>
				</li>
			</ul>
		</nav>
	);
}
