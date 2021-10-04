<template>
    <div></div>
</template>

<script>
import AuthUser from '../store/authUser'
export default {
    mounted(){
        AuthUser.dispatch('logout')
        this.$swal({title:"Log out Success!",icon:"success"})
        this.$router.push('/')
    }
}
</script>

<style>

</style>