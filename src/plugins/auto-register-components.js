export default function(app) {
	const files = import.meta.glob('../components/app/**/*.vue', { eager: true })

	Object.entries(files).forEach(([, component]) => {
		app.component(component?.default?.name, component?.default)
	})

	return app
}
