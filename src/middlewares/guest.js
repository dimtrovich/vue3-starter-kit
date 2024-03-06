import { empty } from "php-in-js/modules/types";
import { useAuthStore } from "@/stores";

export default function({from, next}) {
	if (! empty(useAuthStore().accessToken)) {
		if (from.name) {
			return next({ name: from.name })
		} 
		
		if (from.path) {
			return next(from.path)
		} 

		return next({ name: 'home'})
	}
	
	return next()
}
