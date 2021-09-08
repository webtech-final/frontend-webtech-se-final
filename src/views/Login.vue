<template>
    <div class="bg">
        <div style="padding-top: 200px"><login></login></div>
    </div>
</template>

<script>
import Login from '../components/Login/Login.vue'
export default {
    components:{
        Login
    }
}
</script>

<style>
.bg{
    background-image: url('../assets/background.png');
    background-position: center;
    background-size: cover;
    min-height: 100vh;
}
</style>