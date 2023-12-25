import { defineStore } from 'pinia';

import { $storage } from '@/plugins/storage';
import { $axios } from '@/plugins/axios';
import router from '@/router';
import { API_AUTH_USER_PATH, API_LOGIN_PATH, API_REGISTER_PATH } from '@/utils/constants';

const route = router.currentRoute.value

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: $storage.local.get('user'),
        accessToken: $storage.local.get('access_token'),
    }),
    actions: {
		/**
		 * Inscription
		 * 
		 * @param {{[key: string]: any}} data donnees a soumettre
		 */
        async register(data, callback) {
            await $axios.post(API_REGISTER_PATH, data);    

			if (callback) {
				callback({router, route});
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
            $storage.local.set('access_token', result.access_token)
                
            let redirect = route.query.redirect || 'home'
            if (['login'].includes(redirect)) {
                redirect = 'home'
            }
            router.push({ name: redirect })
        },

		/**
		 * Deconnexion
		 */
        logout() {
            this.user        = null
            this.accessToken = null
            $storage.local.remove('access_token', 'user')
            router.push({ name: 'login' });
        },
        async getUser() {
            const { result } = await $axios.get(API_AUTH_USER_PATH);    

            this.user = result.user
            $storage.local.set('user', result.user)
        }
    }
});
