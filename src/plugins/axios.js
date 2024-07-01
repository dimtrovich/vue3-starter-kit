import axios from 'axios'

import { isLoginRedirectable, mapErrors } from '@/utils/helpers'
import { $alert } from '@/utils/alerts'
import { $i18n } from './i18n'
import { $storage } from './storage'
import { API_URL } from '@/utils/constants'
import { useAuthStore } from '@/stores/auth.store'

export const statusCodesToHandle = [400, 401, 422]

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
	// Happens for cancelled requests using axios CancelTokenSource
	if (!error.response) {
	  	return Promise.reject(error)
	}
  
	// eslint-disable-next-line prefer-destructuring
	const { status } = error.response
	let errors = ''
  
	if (statusCodesToHandle.includes(status)) {
	  	errors = mapErrors(error.response.data)
	  	if (errors === 'Unauthenticated.') {
			errors = $i18n.t('messages.votre_session_est_expiree_veuillez_vous_reconnecter')
	  	}

		$alert.error(errors)
		error.handled = true
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
  
	if ([401, 498].includes(status) && isLoginRedirectable()) {
		$storage.local.set('session_expire', true)

		return useAuthStore().logout()
	}

	return Promise.reject(error)
}
