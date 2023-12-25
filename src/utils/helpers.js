import { $storage } from "@/plugins/storage";

/**
 * Recupere la langue a utilier par defaut
 * 
 * @return {String}
 */
export function findLocale() {
	let lang = $storage.cookie.get('locale')

	if (lang == null || lang == undefined || !lang || typeof lang == 'undefined') {
		lang = (window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage).substr(0,2).toLowerCase();
	}
	
	const AVAILABLE_LOCALES = import.meta.env.VITE_AVAILABLE_LOCALES || ['fr', 'en']

	if (! AVAILABLE_LOCALES.includes(lang)) {
		lang = import.meta.env.VITE_DEFAULT_LOCALE || 'fr'
	}

	return lang
}

/**
 * Regroupe un tableau d'objet par cle
 * 
 * @param {Object[]} array 
 * @param {String} key 
 * @returns {Object}
 */
export function groupBy(array, key) {
    return array.reduce(function (r, a) {
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        
        return r;
    }, Object.create(null));
}
