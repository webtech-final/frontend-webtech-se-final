<template>
    <div class="bg">
        <div class="container mx-auto py-10">
            <profile></profile><br>
            <play-log></play-log><br>
            <point-log></point-log>
        </div>
    </div>
</template>

<script>
import Profile from '@/components/profile/Profile.vue'
import PlayLog from '@/components/profile/PlayLog.vue'
import PointLog from '@/components/profile/PointLog.vue'
export default {
    components: {
        Profile,
        PlayLog,
        PointLog
    }
}
</script>

<style lang="scss" scoped>
.bg {
    background-image: url('../assets/background.png');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
}
</style>