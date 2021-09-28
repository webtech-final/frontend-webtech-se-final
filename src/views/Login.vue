<template>
    <div class="bg">
        <div style="padding-top: 180px"><login></login></div>
    </div>
</template>

<script>
import Login from '../components/login/Login.vue';
export default {
    components: {
        Login,
    },
};
</script>

<style lang="scss" scoped>
.bg {
    background-image: url('../assets/background-default.jpg');
    background-position: center;
    background-size: cover;
    min-height: 100vh;
    text-align: center;
    color: white;
}
</style>
