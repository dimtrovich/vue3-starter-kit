import { is_string } from 'php-in-js/modules/types'
import { trim } from 'php-in-js/modules/string'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './constants'
import { $storage } from '@/plugins/storage'
import router from '@/router'

/**
 * Recupere la langue a utilier par defaut
 *
 * @return {String}
 */
export function findLocale() {
	let lang = $storage.cookie.get('locale')

	if (lang == null || lang == undefined || !lang || typeof lang == 'undefined') {
		lang = (window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage).substr(0, 2).toLowerCase()
	}

	if (!AVAILABLE_LOCALES.includes(lang)) {
		lang = DEFAULT_LOCALE
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
	return array.reduce(function(r, a) {
		r[a[key]] = r[a[key]] || []
		r[a[key]].push(a)

		return r
	}, Object.create(null))
}

/**
 * Determine l'url complete d'une route en fonction de son path
 *
 * @param {string|object} to
 * @returns {string}
 */
export function resolveRoutePath(to) {
	if (is_string(to)) {
		to = { path: to }
	}

	return router.resolve(to).href
}

/**
 * Verifie si l'url courrante peut etre regirigée vers le login ou pas
 */
export function isLoginRedirectable() {
	const currentUrl = trim(window.location.href, '/')

	return false === currentUrl.includes('login')
}

/**
 * 
 * @param {any} data 
 * @returns {string} 
 */
export function mapErrors(data) {
	let errors = ''
  
	if ((!data.errors && data.message) || data.messages) {
	  return data.message || data.messages[0]
	}
  
	if (Array.isArray(data.errors)) {
	  const hasStringErrors = typeof data.errors[0] === 'string'
  
	  if (hasStringErrors) {
		return data.errors[0]
	  }
  
	  data.errors = data.errors[0]
	}
	for (const err in data.errors) {
	  let errorRow = data.errors[err].join('</br>')
	  if (!errorRow.endsWith('</br>')) {
		errorRow += '</br>'
	  }
  
	  errors += errorRow
	}

	return errors
}
