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
			<p>{t("promises")}</p>
			<Link href="/survey">{t("proceed")}</Link>
		</div>
	);
}
