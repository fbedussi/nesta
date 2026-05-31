import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { defaultLanguage } from "../i18n";
import styles from "./language-swifther.module.css";

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const switchLanguage: MouseEventHandler<HTMLInputElement> = (e) => {
		const language = (e.currentTarget as HTMLInputElement)?.value;
		i18n.changeLanguage(language);
	};

	return (
		<div className={styles.container}>
			<input
				type="radio"
				id="it"
				name="language"
				value="it"
				onClick={switchLanguage}
				defaultChecked={defaultLanguage === "it"}
			/>
			<label htmlFor="it" aria-label="Italiano">
				🇮🇹
			</label>
			<input
				type="radio"
				id="en"
				name="language"
				value="en"
				onClick={switchLanguage}
				defaultChecked={defaultLanguage === "en"}
			/>
			<label htmlFor="en" aria-label="English">
				🇬🇧
			</label>
		</div>
	);
};
