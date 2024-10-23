/**
 * Enregistre les middlewares qui s'executerons globalement
 */

import autoLogout from '../auto-logout'
import checkAuth from '../authenticate'
import checkGuest from '../guest'

/**
 *
 * @param {{to: any, from: any, next: function}} params
 * @param {array} middlewares
 * @returns {array}
 */
export default function({ to }, middlewares) {
	if (to.meta.noAuth !== true) {
		middlewares.unshift(checkAuth, autoLogout)
	} else {
		middlewares.unshift(checkGuest)
	}

	return middlewares
}
