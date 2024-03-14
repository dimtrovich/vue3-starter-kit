import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/fr';
import 'dayjs/locale/en';
import { i18n } from './i18n';

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(isBetween)

let locale = i18n.global.locale
if (! ['fr', 'en'].includes(locale)) {
	locale = 'fr'
}
dayjs.locale(locale)

export const $days = dayjs

export default function(app) {
    app.use({
		install(app) {
            if (!app.hasOwnProperty("$dayjs")) {
    			app.$dayjs = dayjs
            }
            app.config.globalProperties.$dayjs = dayjs
            window.$dayjs = dayjs
		},
	})

    return app;
}
