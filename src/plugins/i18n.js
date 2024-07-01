import { createI18n } from 'vue-i18n'

import { $storage } from './storage'
import { findLocale } from '@/utils/helpers'

const messages = loadLocaleMessages()

export const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: findLocale(),
	messages,
})

export const $i18n = { ...i18n.global }

export const { t: $t } = $i18n

export function changeLanguage(language) {
	$storage.cookie.set('locale', language)
	i18n.global.locale = language
	$i18n.locale = language
}

export default function(app) {
	app.use(i18n)

	return app
}

function loadLocaleMessages() {
	const messages = {}
	const files = import.meta.glob('../translations/**/*.json', { eager: true })

	Object.entries(files).forEach(([path, definition]) => {
		const parts = path.split('/')
		const locale = parts[2]
		const namespace = parts.at(-1).replace('.json', '')
		if (!messages[locale]) {
			messages[locale] = {}
		}
		if (!messages[locale][namespace]) {
			messages[locale][namespace] = {}
		}
		const message = definition?.default
		messages[locale][namespace] = { ...messages[locale][namespace], ...message }
	})

	return messages
}
