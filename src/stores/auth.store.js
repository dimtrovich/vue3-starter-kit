/* eslint-disable prefer-destructuring */
/* eslint-disable sort-keys */
import { defineStore, getActivePinia } from 'pinia'

import { API_AUTH_USER_PATH, API_LOGIN_PATH, API_REGISTER_PATH, INACTIVE_SESSION_TIMEOUT } from '@/utils/constants'
import { $axios } from '@/plugins/axios'
import { $days } from '@/plugins/dayjs'
import { $storage } from '@/plugins/storage'
import { resolveRoutePath } from '@/utils/helpers'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
	persist: true,
	state: () => ({
		accessToken: null,
		expireAt: null,
		user: null,
	}),
	actions: {
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
			this.expireAt = $days().add(INACTIVE_SESSION_TIMEOUT, 'minutes')

			const route = router.currentRoute.value

			let redirect = route.query.redirect || '/'
			if (['login'].includes(redirect)) {
				redirect = '/'
			}

			await this.getUser()

			window.location.href = resolveRoutePath(redirect)
		},

		/**
		 * Deconnexion
		 *
		 * @param {string} [to='login'] Page où sera redirigé l'utilisateur après la deconnexion
		 */
		logout(to = 'login', redirect = null) {
			getActivePinia()._s.forEach((store) => store.$reset())

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
