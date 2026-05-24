import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import English from "./translations/en.json";
import Italian from "./translations/it.json";

const resources = {
	en: {
		translation: English,
	},
	it: {
		translation: Italian,
	},
};

export const defaultLanguage: "it" | "en" = "it";

i18next.use(initReactI18next).init({
	resources,
	lng: defaultLanguage,
});

export default i18next;
