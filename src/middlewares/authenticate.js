import { empty } from "php-in-js/modules/types";
import { useAuthStore } from "@/stores";

export default async function({to, next}) {
	const auth = useAuthStore()
	if (empty(auth.accessToken)) {
        auth.user = null
		auth.accessToken = null
		
		return next({ name: 'login', query: {redirect: to.name} })
	}
	
	if (empty(auth.user)) {
		await auth.getUser()
	}
	
	return next()
}
