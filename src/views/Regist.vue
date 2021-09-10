<template>
    <div class="bg">
        <div><regist></regist></div>
    </div>
</template>

<script>
import Regist from '../components/regist/Regist.vue'
export default {
    components:{
        Regist
    }
}
</script>

<style lang="scss" scoped>
.bg{
    background-image: url('../assets/background.png');
    background-position: center;
    background-size: cover;
    min-height: 100vh;
    text-align: center;
    color: white
}
</style>