export default function(app) {
	const files = import.meta.glob('./**/*.js', { eager: true });

	Object.entries(files).forEach(([, definition]) => {
		app = definition.default(app);
	})

	return app;
}
