<template>
    <div class="page">
        <app-header />
        <sidebar />
        <div class="main-content app-content">
            <div class="container-fluid">
                <slot />
            </div>
        </div> 
        <app-footer />
    </div>
</template>

<script>
import { defineComponent } from 'vue';

import Sidebar from '../partials/Sidebar.vue';
import AppHeader from '../partials/Header.vue';
import AppFooter from '../partials/Footer.vue';


export default defineComponent({
    name: 'MainLayout',
    components: {
        Sidebar, AppFooter, AppHeader,
    },
})
</script>

<style>

</style>
