import './assets/main.css'
import './assets/main.js'

import { createApp } from 'vue'

import App from './App.vue'
import initPlugin from './plugins'

initPlugin(createApp(App)).mount('#app')
