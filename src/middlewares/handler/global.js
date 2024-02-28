/**
 * Enregistre les middlewares qui s'executerons globalement
 */

import checkAuth from "../authenticate"
import checkGuest from "../guest"

/**
 * 
 * @param {{to: any, from: any}} params 
 * @param {array} middlewares 
 * @returns {array}
 */
export default function({to, from}, middlewares) {
	if (to.meta.noAuth !== true) {
		// middlewares.unshift(checkAuth)	
	} else {
		middlewares.unshift(checkGuest)	
	}

	return middlewares
}
