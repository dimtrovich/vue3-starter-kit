<script setup>
import { provide, shallowRef } from 'vue'
import { useMeta } from 'vue-meta'

import { APP_NAME } from '@/utils/constants'
import { findLocale } from '@/utils/helpers'
import router from '@/router'

const layout = shallowRef('div')
router.afterEach((to) => {
	const l = to.meta.layout || 'empty'
	layout.value = l ? `${l}-layout` : 'div'
})
provide('app:layout', layout)

useMeta({
	htmlAttrs: { amp: true, lang: findLocale() },
	title: '',
})
</script>

<template>
	<metainfo>
		<template #title="{ content }">{{ content ? `${content} | ${APP_NAME}` : APP_NAME }}</template>
	</metainfo>
	<component :is="layout || 'div'">
		<router-view />
	</component>
</template>
