import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default function (app) {
	const pinia = createPinia()
	pinia.use(piniaPluginPersistedstate)
	
	app.use(pinia)

	return app
}
