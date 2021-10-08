<template>
    <div></div>
</template>

<script>
import AuthUser from '../store/authUser'
export default {
    mounted(){
        if(!this.isAuthen()){
            this.$swal("Restricted Area", "You must login first", 'warning')
            this.$router.push('/')
        }else{
            AuthUser.dispatch('logout')
            this.$swal({title:"Log out Success!",icon:"success"})
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

<style>

</style>