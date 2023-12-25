export default function(app) {
	const files = import.meta.globEager('./**/*.js');

	Object.entries(files).forEach(([, definition]) => {
		app = definition.default(app);
	})

	return app;
}
