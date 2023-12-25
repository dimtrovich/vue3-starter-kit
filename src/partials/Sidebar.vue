<template>
    <aside class="app-sidebar">
		
    </aside>
</template>

<script setup>
import { onMounted, onUpdated } from 'vue'

onMounted(() => {
	initSidebarScrollbar()
})

onUpdated(() => {
	initSidebarScrollbar()
})

function initSidebarScrollbar() {

}
</script>
