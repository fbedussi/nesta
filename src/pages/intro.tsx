import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/language-switcher";
import { Logo } from "../components/logo";
import { Link } from "../router";

export function Intro() {
	const { t } = useTranslation();

	return (
		<div>
			<LanguageSwitcher />
			<Logo />
			<ul>
				<li>{t("promise1")}</li>
				<li>{t("promise2")}</li>
				<li>{t("promise3")}</li>
				<li>{t("promise4")}</li>
				<li>{t("promise5")}</li>
			</ul>
			<Link href="/survey">{t("introCta")}</Link>
		</div>
	);
}
