<template>
    <div class="bg">
        <div class="container mx-auto py-10">
            <profile></profile><br>
            <play-log></play-log><br>
            <versus-log></versus-log><br>
            <point-log></point-log>
        </div>
    </div>
</template>

<script>
import Profile from '@/components/profile/Profile.vue'
import PlayLog from '@/components/profile/PlayLog.vue'
import VersusLog from '@/components/profile/VersusLog.vue'
import PointLog from '@/components/profile/PointLog.vue'
export default {
    components: {
        Profile,
        PlayLog,
        VersusLog,
        PointLog
    }
}
</script>

<style lang="scss" scoped>
.bg {
    background-image: url('../assets/background-default.jpg');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
}
</style>