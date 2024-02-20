import pushGlobal from "./global"

/**
 * Executeur des middlewares
 * 
 * @returns 
 */
export default function(to, from, next) {
	let middlewares = []
	if (to.meta.middleware) {
		middlewares = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
	}

	middlewares = pushGlobal({to, from, next}, middlewares)
	
	if (! middlewares.length) {
		return next()
	}
	const context = {
        to,
        from,
        next,
    }

	return middlewares[0]({
        ...context,
        next: pipeline(context, middlewares, 1)
    })
}

/**
 * Pipeline d'execution de middlewares 
 */
function pipeline (context, middlewares, index) {
    const nextMiddleware = middlewares[index]

    if (!nextMiddleware) {
        return context.next 
    }

    return () => {
        const nextPipeline = pipeline(
            context, middlewares, index + 1
        )

        nextMiddleware({ ...context, next: nextPipeline })
    }
}
