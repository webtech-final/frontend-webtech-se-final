<template>
    <div class="bg" style="padding-top: 100px; padding-bottom: 100px">
        <div><leaderboard></leaderboard></div>
    </div>
</template>

<script>
import Leaderboard from '../components/leaderboard/Leaderboard.vue'
export default {
    components:{
        Leaderboard
    }
}
</script>

<style lang="scss" scoped>
.bg{
    background-image: url('../assets/background.png');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    text-align: center;
}

</style>