import php from 'php-in-js'

export const $php = php

export default function(app) {
	app.use({
		install(app) {
			app.config.globalProperties.$asset = (path) => {
				return new URL(`../assets/${path}`, import.meta.url).href
			}

			app.config.globalProperties.$php = $php
		},
	})

	return app
}
