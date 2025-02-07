import { is_array, is_object, is_string } from 'php-in-js/modules/types'
import axios from 'axios'

import { $alert } from '@/utils/alerts'
import { $i18n } from './i18n'
import { $storage } from './storage'
import { API_URL } from '@/utils/constants'
import { isLoginRedirectable } from '@/utils/helpers'
import { useAuthStore } from '@/stores/auth.store'

export const statusCodesToHandle = [400, 401, 404, 406, 409, 422, 428]

const config = {
	baseURL: API_URL,
	// timeout: 60 * 1000, // Timeout
	// withCredentials: true, // Check cross-site Access-Control
}
const _axios = axios.create(config)

_axios.interceptors.request.use(requestInterceptor)

_axios.interceptors.response.use(successInterceptor, errorInterceptor)

export default function(app) {
	app.use({
		install(Vue) {
			Vue.$axios = _axios
		},
	})

	return app
}

export const $axios = _axios

/**
 * Intercepteur de requete axios 
 */
function requestInterceptor(config) {
	if (!config.headers) {
		config.headers = {}
	}
	
	config.headers.Accept = 'application/vnd.api+json'

	const { accessToken } = useAuthStore()
	
	if (!config.headers.Authorization && accessToken !== null && accessToken !== undefined && accessToken !== '') {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
  
	return config
}

/**
 * Intercepteur de reponse ok 
 */
function successInterceptor(response) {
	return response.data
}

/**
 * Intercepteur de reponse d'echec 
 */
async function errorInterceptor(error) {	
	// Se produit pour les requetes annulées utilisant axios CancelTokenSource
	if (!error.response) {
	  	return Promise.reject(error)
	}
  
    const { response } = error
	const { status } = response

	let errors = ''
  
  	if (response.data.code) {
	    // eslint-disable-next-line prefer-destructuring
	    error.code = response.data.code
	}

	if (statusCodesToHandle.includes(status)) {
	  	errors = mapErrors(response.data)
	  	if (errors === 'Unauthenticated.') {
			errors = $i18n.t('messages.votre_session_est_expiree_veuillez_vous_reconnecter')
			error.handled = true
	  	}

		// $alert.error(errors)
	}
  
	if (status === 403) { // Forbidden
	  	errors = $i18n.t('messages.vous_n_etes_pas_autoriser_a_effectuer_cette_action')
	  	$alert.error(errors)
		error.handled = true
	}
  
	if (status === 500) { // InternalServerError
	  	errors = $i18n.t('messages.une_erreur_s_est_produite_lors_de_la_requete')
		$alert.error(errors)
		error.handled = true
	}
  
	if (status === 498) { // Token expired
		errors = $i18n.t('messages.votre_session_est_expiree_veuillez_vous_reconnecter')
		$alert.error(errors)
		error.handled = true
	}

	error.errors = errors
	error.status = status
  
	if (is_string(errors)) {
		error.message = errors
		delete error.errors
	} else {
		delete error.message
	}
	
	if ([401, 498].includes(status) && isLoginRedirectable()) {
		$storage.local.set('session_expire', true)

		return useAuthStore().logout()
	}

	return Promise.reject(error)
}

/**
 * 
 * @param {any} data 
 * @returns {any} 
 */
function mapErrors(data) {
	if ((!data.errors && data.message) || data.messages) {
	  return data.message || data.messages[0]
	}
	
	if (is_array(data.errors)) {
	  const hasStringErrors = typeof data.errors[0] === 'string'
  
		if (hasStringErrors) {
			return data.errors[0]
		}
	}

	if (is_object(data.errors)) {
		const result = {}
		for (const key in data.errors) {
			// eslint-disable-next-line prefer-destructuring
			const value = data.errors[key]
			// eslint-disable-next-line @stylistic/js/quotes
			result[key] = (Array.isArray(value) ? value : [value]).join("\n")
		}

		return result
	}
		
	return data.errors
}
