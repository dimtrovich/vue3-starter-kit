import { createPinia } from 'pinia'

export default function (app) {
	app.use(createPinia())

	return app
}
