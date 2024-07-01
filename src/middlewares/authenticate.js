import { useAuthStore } from '@/stores/auth.store'

export default async function({ to, next, router }) {
	if (!useAuthStore().isLoggedIn()) {
		return router.push({ name: 'login', query: { redirect: to.path } })
	}

	return next()
}
