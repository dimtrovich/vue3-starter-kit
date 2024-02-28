<script setup>
import { provide, shallowRef } from 'vue'
import { useMeta } from 'vue-meta'
import router from './router'
import  { APP_NAME } from './utils/constants'
import { findLocale } from './utils/helpers'

const layout = shallowRef('div')
router.afterEach((to) => {
  const l = to.meta.layout || 'empty'
  layout.value = l ? `${l}-layout` : 'div'
})
provide('app:layout', layout)

useMeta({
	title: '',
	htmlAttrs: { lang: findLocale(), amp: true }
})
</script>

<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content ? `${content} | ${APP_NAME}` : APP_NAME }}</template>
	</metainfo>
  	<component :is="layout || 'div'">
    	<router-view />      
  	</component>
</template>
