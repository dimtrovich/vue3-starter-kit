/**
 * Middlware pour automatiquement deconnecter l'utilisateur apres une durée d'inactivité
 */

import { empty } from 'php-in-js/modules/types'

import { $days } from '@/plugins/dayjs'
import { useAuthStore } from '@/stores/auth.store'

export default function({ next }) {
	const authStore = useAuthStore()
	
	const { expireAt } = authStore

	if (empty(expireAt) || $days().isAfter(expireAt, 'minutes')) {
		authStore.logout()
		
		return next({ name: 'login' })
	}

	authStore.incrementTimeout()

	return next()
}
