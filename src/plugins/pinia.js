import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

import { APP_ID } from '@/utils/constants'

export default function(app) {
	const pinia = createPinia()
	pinia.use(createPersistedState({
		key: (id) => `${APP_ID}.${id}`,
	}))

	app.use(pinia)

	return app
}
