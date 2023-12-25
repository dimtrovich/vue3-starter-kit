import { $storage } from '../plugins/storage';

export default function({to, next}) {
	const access_token = $storage.local.get('access_token')
	if (access_token === null || access_token === '') {
        $storage.local.remove('access_token', 'user')
		// next({ name: 'login', query: {redirect: to.name} })
		
		// return false
	}
	
	next()
}
