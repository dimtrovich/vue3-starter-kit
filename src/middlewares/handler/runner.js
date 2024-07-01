import pushGlobal from './global'

/**
 * Executeur des middlewares
 *
 * @returns
 */
export default function(router) {
	return function(to, from, next) {
		let middlewares = []
		if (to.meta.middleware) {
			middlewares = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
		}

		middlewares = pushGlobal({ from, next, to }, middlewares)

		if (!middlewares.length) {
			return next()
		}
		const context = {
			from,
			next,
			router,
			to,
		}

		return middlewares[0]({
			...context,
			next: pipeline(context, middlewares, 1),
		})
	}
}

/**
 * Pipeline d'execution de middlewares
 *
 * @param {object} context
 * @param {Function[]} middlewares
 * @param {Number} index
 */
function pipeline(context, middlewares, index) {
	// eslint-disable-next-line prefer-destructuring
	const nextMiddleware = middlewares[index]

	if (!nextMiddleware) {
		return context.next
	}

	return () => {
		const nextPipeline = pipeline(context, middlewares, index + 1)

		nextMiddleware({ ...context, next: nextPipeline })
	}
}
