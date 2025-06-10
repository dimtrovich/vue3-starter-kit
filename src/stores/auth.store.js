/* eslint-disable prefer-destructuring */
/* eslint-disable sort-keys */
import { defineStore, getActivePinia } from 'pinia'

import { API_AUTH_USER_PATH, API_LOGIN_PATH, API_REGISTER_PATH, INACTIVE_SESSION_TIMEOUT } from '@/utils/constants'
import { $axios } from '@/plugins/axios'
import { $dayjs } from '@/plugins/dayjs'
import { $storage } from '@/plugins/storage'
import { resolveRoutePath } from '@/utils/helpers'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
	persist: true,
	state: () => ({
		accessToken: null,
		expireAt: null,
		lastConnected: $storage.local.get('last-connected-email'),
		user: null,
	}),
	actions: {
		/**
		 * Defini les informations du dernier utilisateur connecter
		 */
		setLastConnected(email) {
			this.lastConnected = { email, date: $dayjs().toISOString() }
			$storage.local.set('last-connected-email', this.lastConnected)
		},
		/**
		 * Recupere les informations du dernier utilisateur connecter
		 */
		getLastConnected(key = null) {
			if (this.lastConnected === null || key === null) {
				return this.lastConnected
			}
			return this.lastConnected[key]
		},

		/**
		 * Incremente la duree de vie de la session
		 */
		incrementTimeout(timeout) {
			this.expireAt = $dayjs().add(timeout || INACTIVE_SESSION_TIMEOUT, 'minutes').format()
		},
		
		/**
		 * Inscription
		 *
		 * @param {{[key: string]: any}} data donnees a soumettre
		 */
		async register(data, callback) {
			const response = await $axios.post(API_REGISTER_PATH, data)

			if (callback) {
				const route = router.currentRoute.value

				callback({ router, route, response })
			}
		},

		/**
		 * Connexion
		 *
		 * @param {{[key: string]: any}} data donnees a soumettre
		 */
		async login(data) {
			const { result } = await $axios.post(API_LOGIN_PATH, data)

			this.accessToken = result.access_token
			
			const route = router.currentRoute.value

			let redirect = route.query.redirect || '/'
			if (['login'].includes(redirect)) {
				redirect = '/'
			}

			await this.getUser()
			this.incrementTimeout(INACTIVE_SESSION_TIMEOUT)

			window.location.href = resolveRoutePath(redirect)
		},

		/**
		 * Deconnexion
		 *
		 * @param {string} [to='login'] Page où sera redirigé l'utilisateur après la deconnexion
		 */
		logout(to = 'login', redirect = null) {
			if (this.user) {
				this.setLastConnected(this.user.email)
			}

			getActivePinia()._s.forEach(store => store.$reset())

			if (!redirect || $storage.local.get('session_expire')) {
				redirect = router.currentRoute.value.path
				$storage.local.remove('session_expire')
			}

			window.location.href = resolveRoutePath({ name: to, query: { redirect } })
		},

		/**
		 * Récuperation des données de l'utilisateur actuellement connecté
		 */
		async getUser() {
			const { result } = await $axios.get(API_AUTH_USER_PATH)

			this.user = result.user
		},

		/**
		 * Verifie si l'utilisateur est connecté
		 */
		isLoggedIn() {
			if (this.user !== null && this.accessToken !== null) {
				return true
			}

			this.user = this.accessToken = null

			return false
		},
	},
})
