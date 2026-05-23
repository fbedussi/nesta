import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/language-switcher";
import { Logo } from "../components/logo";

export function Intro() {
	const { t } = useTranslation();

	return (
		<div>
			<LanguageSwitcher />
			<Logo />
			<p>{t("promises")}</p>
			<a href="survey">{t("proceed")}</a>
		</div>
	);
}
