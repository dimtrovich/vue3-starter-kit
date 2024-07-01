import { useAuthStore } from '@/stores/auth.store'

export default function({ from, next }) {
	if (useAuthStore().isLoggedIn()) {
		if (from.name) {
			return next({ name: from.name })
		}
		if (from.path) {
			return next(from.path)
		}

		return next({ name: 'home' })
	}

	return next()
}
