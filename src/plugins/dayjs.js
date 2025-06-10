import dayjs from 'dayjs'

import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/fr'
import 'dayjs/locale/en'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@/utils/constants'
import { $i18n } from './i18n'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

let { locale } = $i18n
if (!AVAILABLE_LOCALES.includes(locale)) {
	locale = DEFAULT_LOCALE
}
dayjs.locale(locale)

export const $dayjs = dayjs

export default function(app) {
	app.use({
		install(app) {
			app.config.globalProperties.$dayjs = dayjs
			window.$dayjs = dayjs
		},
	})

	return app
}
