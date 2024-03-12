import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap } from 'bootstrap-vue-next'

export default function (app) {
	app.use(createBootstrap())

	return app
}
