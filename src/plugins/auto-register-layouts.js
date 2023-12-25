export default function(app) {
	const files = import.meta.globEager('../layouts/**/*.vue');

	Object.entries(files).forEach(([, layout]) => {
		app.component(layout?.default?.name, layout?.default);
	})

	return app;
}
