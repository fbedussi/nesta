import { defaultLanguage } from "../i18n";

export function formatDate(date?: string) {
	return !date
		? ""
		: new Intl.DateTimeFormat(defaultLanguage, {
				dateStyle: "full",
			}).format(new Date(date));
}
