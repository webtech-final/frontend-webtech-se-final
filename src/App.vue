<template>
    <div id="app" ref="app">
        <navbar></navbar>
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
    components: {
        Navbar,
    },
};
</script>

<style lang="scss">
#app {
    background-image: url('./assets/background-default.jpg');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
}
</style>
