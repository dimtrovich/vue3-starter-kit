/**
 * Middlware pour automatiquement deconnecter l'utilisateur apres une durée d'inactivité
 */

import { empty } from 'php-in-js/modules/types'

import { $days } from '@/plugins/dayjs'
import { $storage } from '@/plugins/storage'
import { INACTIVE_SESSION_TIMEOUT } from '@/utils/constants'
import { useAuthStore } from '@/stores/auth.store'

export default function({ next }) {
	let timeout = $storage.local.get('session_expire_at')
	if (typeof timeout === 'object' && timeout !== null) {
		({ value: timeout } = timeout)
	}

	if (empty(timeout) || $days().isAfter(timeout, 'minutes')) {
		const authStore = useAuthStore()
		authStore.logout()

		return next({ name: 'login' })
	}

	$storage.local.set('session_expire_at', $days(timeout).add(INACTIVE_SESSION_TIMEOUT / 2, 'minutes'))
	return next()
}
