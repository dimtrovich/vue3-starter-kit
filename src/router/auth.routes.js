export default [
	{
        path: '/login',
        name: 'login',
		meta: { layout: "empty", noAuth: true },
        component: () => import('@/views/auth/Login.vue')
    },
	{
        path: '/register',
        name: 'register',
		meta: { layout: "empty", noAuth: true },
        component: () => import('@/views/auth/Register.vue')
    },
]
