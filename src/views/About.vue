<template>
  	<b-container class="home">
		<nav class="d-flex w-100 justify-content-center">
			<b-link class="mx-1" to="/">Home</b-link>
			<b-link class="mx-1 text-dark" to="/about">About</b-link>
		</nav>
		
		<h1>This is an about page</h1>

		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere ducimus molestias ut reprehenderit quo, esse in tempore omnis dolores. Laborum voluptatem amet sit quibusdam excepturi. Quaerat similique vel eius voluptatem.
		</p>
	</b-container>
</template>

<script setup>
import { useMeta } from 'vue-meta'

useMeta({
	title: 'About application',
})
</script>
