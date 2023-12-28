/**
 * URL de base de l'API
 * 
 * @return {string}
 */
export function apiUrl() {
	return import.meta.env.VITE_API_URL || 'http://localhost/api';
}

/**
 * @var {string} APP_NAME Nom de l'application
 */
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vue3 Starter Kit';

/**
 * @var {string} APP_ID ID de l'application
 */
export const APP_ID = import.meta.env.VITE_APP_ID || APP_NAME.toLowerCase().replace(/\S+/, '');

/**
 * @var {string[]} AVAILABLE_LOCALES Liste des langues autorisées
 */
export const AVAILABLE_LOCALES = import.meta.env.VITE_AVAILABLE_LOCALES || ['fr', 'en']

/**
 * @var {string[]} ROUTES_EMPTY_LAYOUT Routes qui utiliseront le layout 'empty'
 */
export const ROUTES_EMPTY_LAYOUT = import.meta.env.VITE_ROUTES_EMPTY_LAYOUT || ['login', 'register', 'signin', 'signup', 'init']

/**
 * @var {string} API_LOGIN_PATH Chemin du login vers l'api
 */
export const API_LOGIN_PATH = import.meta.env.VITE_API_LOGIN_PATH || 'auth/login'

/**
 * @var {string} API_REGISTER_PATH Chemin du register vers l'api
 */
export const API_REGISTER_PATH = import.meta.env.VITE_API_REGISTER_PATH || 'auth/register'

/**
 * @var {string} API_AUTH_USER_PATH Chemin pour recuperer l'utilisateur actuellement connecter
 */
export const API_AUTH_USER_PATH = import.meta.env.VITE_API_AUTH_USER_PATH || 'auth/user'
