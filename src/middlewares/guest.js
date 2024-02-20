import { $storage } from '../plugins/storage';

export default function({from, next}) {
	const access_token = $storage.local.get('access_token')
	if (access_token !== null && access_token !== '') {
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
