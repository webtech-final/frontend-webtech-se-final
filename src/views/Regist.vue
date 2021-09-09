<template>
    <div class="bg">
        <div><regist></regist></div>
    </div>
</template>

<script>
import Regist from '../components/Regist/Regist.vue'
export default {
    components:{
        Regist
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