import { createRouter, createWebHistory } from 'vue-router'

import { ROUTES_EMPTY_LAYOUT } from '@/utils/constants'
import runMiddlewares from '@/middlewares/handler/runner'

const routes = [
	{
		path: '/',
		name: 'home',
		meta: { noAuth: true },
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/about',
		name: 'about',
		meta: { noAuth: true },
		component: () => import('@/views/About.vue'),
	},
]

const files = import.meta.glob('./**/*.routes.js', { eager: true })
Object.entries(files).forEach(([, definition]) => {
	routes.push(...definition.default)
})

for (const route of routes) {
	for (const key in route) {
		const meta = route.meta || {}
		if (!meta.layout) {
			meta.layout = !ROUTES_EMPTY_LAYOUT.includes(route.name || route.path) ? 'main' : 'empty'
		}
		route.meta = meta
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach(runMiddlewares(router))

export default router
