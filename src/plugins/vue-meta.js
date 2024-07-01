import { createMetaManager, plugin as metaPlugin } from 'vue-meta'

export default function(app) {
	app.use(createMetaManager())
	app.use(metaPlugin)

	return app
}
