import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const switchLanguage: MouseEventHandler<HTMLInputElement> = (e) => {
		const language = (e.currentTarget as HTMLInputElement)?.value;
		i18n.changeLanguage(language);
	};

	return (
		<div>
			<input
				type="radio"
				id="it"
				name="language"
				value="it"
				onClick={switchLanguage}
			/>
			<label htmlFor="es">Italiano</label>
			<input
				type="radio"
				id="en"
				name="language"
				value="en"
				onClick={switchLanguage}
			/>
			<label htmlFor="en">English</label>
		</div>
	);
};
