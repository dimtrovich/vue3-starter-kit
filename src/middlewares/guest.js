import { $storage } from '../plugins/storage';

export default function({from, next}) {
	const access_token = $storage.local.get('access_token')
	if (access_token !== null && access_token !== '') {
		if (from.name) {
			next({ name: from.name })
		} else if (from.path) {
			next(from.path)
		} else {
			next({ name: 'home'})
		}
		
		return false
	}
	
	next()
}