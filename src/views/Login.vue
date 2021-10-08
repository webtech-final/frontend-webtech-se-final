<template>
    <div class="bg">
        <div style="padding-top: 180px"><login></login></div>
    </div>
</template>

<script>
import Login from '../components/login/Login.vue';
import AuthUser from '../store/authUser'
export default {
    components: {
        Login,
    },
    mounted(){
        if(this.isAuthen()){
            this.$swal("Restricted Area", "You already Login", 'warning')
            this.$router.push('/')
        }
    },
    methods:{
        isAuthen(){
            return AuthUser.getters.isAuthen
        }
    }
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
