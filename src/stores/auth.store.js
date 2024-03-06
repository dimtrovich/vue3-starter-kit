import { defineStore, getActivePinia } from 'pinia';

import { $axios } from '@/plugins/axios';
import router from '@/router';
import { API_AUTH_USER_PATH, API_LOGIN_PATH, API_REGISTER_PATH, APP_ID } from '@/utils/constants';

export const useAuthStore = defineStore(`${APP_ID}.auth`, {
    persist: true,
    state: () => ({
        user: null,
        accessToken: null,
    }),
    actions: {
		/**
		 * Inscription
		 * 
		 * @param {{[key: string]: any}} data donnees a soumettre
		 */
        async register(data, callback) {
            const response = await $axios.post(API_REGISTER_PATH, data);    

			if (callback) {
				const route = router.currentRoute.value

				callback({router, route, response });
			}
        },

		/**
		 * Connexion
		 * 
		 * @param {{[key: string]: any}} data donnees a soumettre
		 */
        async login(data) {
            const { result } = await $axios.post(API_LOGIN_PATH, data);    

            this.accessToken = result.access_token
                
			const route = router.currentRoute.value
            let redirect = route.query.redirect || 'home'
            if (['login'].includes(redirect)) {
                redirect = 'home'
            }

			window.location.href = router.resolve({ name: redirect }).href
        },

		/**
		 * Deconnexion
		 */
        logout() {
            getActivePinia()._s.forEach(store => store.$reset());
			window.location.href = router.resolve({ name:'login' }).href
        },

		/**
		 * Récuperation des données de l'utilisateur actuellement connecté
		 */
        async getUser() {
            const { result } = await $axios.get(API_AUTH_USER_PATH);    

            this.user = result.user
        }
    }
});
