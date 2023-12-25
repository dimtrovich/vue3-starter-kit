import pushGlobal from "./global"

/**
 * Executeur des middlewares
 * 
 * @param {*} datas 
 * @returns 
 */
export default function (datas) {
	return async function(to, from, next) {
		let middlewares = []
		if (to.meta.middleware) {
			middlewares = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
		}

		middlewares = pushGlobal({to, from, next}, middlewares)
		
		for (let index = 0; index < middlewares.length; index++) {
			const method = middlewares[index]
			const result = method({...datas, to, from, next})
			if (result === false) {
				break
			}
		}

		next()
	}
}
