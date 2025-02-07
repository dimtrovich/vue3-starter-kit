/**
 * @var {string} API_URL URL de base de l'API
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/api'

/**
 * @var {string} APP_NAME Nom de l'application
 */
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vue3 Starter Kit'

/**
 * @var {string} APP_ID ID de l'application
 */
export const APP_ID = (import.meta.env.VITE_APP_ID || APP_NAME.toLowerCase()).replace(/\s/g, '')

/**
 * @var {string[]} AVAILABLE_LOCALES Liste des langues autorisées
 */
export const AVAILABLE_LOCALES = import.meta.env.VITE_AVAILABLE_LOCALES || ['fr', 'en']

/**
 * @var {string[]} DEFAULT_LOCALE Langue par défaut
 */
export const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE || 'fr'

/**
 * @var {string[]} ROUTES_EMPTY_LAYOUT Routes qui utiliseront le layout 'empty'
 */
export const ROUTES_EMPTY_LAYOUT = import.meta.env.VITE_ROUTES_EMPTY_LAYOUT || ['login', 'register', 'signin', 'signup', 'init', 'reset-password']

/**
 * @var {string[]} LOGIN_NOT_REDIRECTABLE Chemin d'acces des pages qui ne peuvent pas etre redirigée vers la page de login si jamais il y'a un soucis d'authentification (HTTP 401 / 498). Voir /src/plugins/axios.js#L119
 */
export const LOGIN_NOT_REDIRECTABLE = import.meta.env.VITE_LOGIN_NOT_REDIRECTABLE || ['login', 'register', 'signin', 'signup', 'init', 'reset-password']

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

/**
 * @var {number} - Nombre de minutes d'inactivite de l'utilisateur avant la deconnexion automatique
 */
export const INACTIVE_SESSION_TIMEOUT = import.meta.env.VITE_INACTIVE_SESSION_TIMEOUT || 5 // 5 minutes
