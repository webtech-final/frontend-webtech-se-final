<template>
    <div class="bg">
        <div class="container mx-auto py-10">
            <profile></profile><br>
            <div class="flex space-x-4">
                <div class="flex-1"><play-log></play-log></div>
                <div class="flex-1"><versus-log></versus-log></div>
            </div><br>
            <point-log></point-log>
        </div>
    </div>
</template>

<script>
import Profile from '@/components/profile/Profile.vue'
import PlayLog from '@/components/profile/PlayLog.vue'
import VersusLog from '@/components/profile/VersusLog.vue'
import PointLog from '@/components/profile/PointLog.vue'
import AuthUser from '../store/authUser'
export default {
    components: {
        Profile,
        PlayLog,
        VersusLog,
        PointLog
    },
    mounted(){
        if(!this.isAuthen()){
            this.$swal("Restricted Area", "You must login first", 'warning')
            this.$router.push('/')
        }
    },
    methods:{
        isAuthen(){
            return AuthUser.getters.isAuthen
        }
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