import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap } from 'bootstrap-vue-next'

import { createMetaManager, plugin as metaPlugin } from 'vue-meta'

import { APP_ID } from '@/utils/constants'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

import router from '../router'

export default function(app) {
	app.use(createBootstrap())
		
	app.use(createMetaManager())
	app.use(metaPlugin)
		
	const pinia = createPinia()
	pinia.use(createPersistedState({ key: (id) => `${APP_ID}.${id}` }))
	app.use(pinia)

	app.use(router)

	return app
}
