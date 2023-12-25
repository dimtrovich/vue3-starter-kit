export default function (app) {
	app.use({
		install(app) {
			app.config.globalProperties.$asset = (path) => {
				return new URL(`../assets/${path}`, import.meta.url).href
			}
		},
	})

	return app
}
