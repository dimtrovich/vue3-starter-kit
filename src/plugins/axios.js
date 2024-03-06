import axios from "axios";
import { empty } from 'php-in-js/modules/types';
import { useAuthStore } from '@/stores/auth.store';
import { API_URL } from '@/utils/constants';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
    baseURL: API_URL,
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
		const token = useAuthStore().accessToken
        if (! empty(token)) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    function(response) {
		response = response.data 

		return response
    },
    function(error) {
        let response = error.response || null
        if (response == null) {
            return Promise.reject(error)
        }
        let data = response.data || null
        if (data == null) {
            return Promise.reject(response)
        }
		
        return Promise.reject(data)
    }
);

export default function(app) {
    app.use({
		install(Vue) {
            Vue.$axios = _axios;
		},
	})

    return app;
}

export const $axios = _axios
