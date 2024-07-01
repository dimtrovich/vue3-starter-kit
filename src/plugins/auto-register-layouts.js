export default function(app) {
	const files = import.meta.glob('../layouts/**/*.vue', { eager: true })

	Object.entries(files).forEach(([, layout]) => {
		app.component(layout?.default?.name, layout?.default)
	})

	return app
}
