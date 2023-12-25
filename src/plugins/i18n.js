import { createI18n } from 'vue-i18n'
import { $storage } from './storage';
import { findLocale } from '@/utils/helpers';

const messages = loadLocaleMessages()

export const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: findLocale(),
	messages
})

export function changeLanguage(language) {
	$storage.cookie.set('locale', language);
	i18n.global.locale = language;
}

export default function (app) {
	app.use(i18n)

	return app
}


function loadLocaleMessages () {
	const messages = {};
	const files = import.meta.globEager('../lang/**/*.js');

	Object.entries(files).forEach(([path, definition]) => {
		const locale = path.split('/')[1]
		if (!messages[locale]) {
			messages[locale] = {}
		}
		const message = definition?.default
		messages[locale] = { ...messages[locale], ...message }
	})

	return messages
}

