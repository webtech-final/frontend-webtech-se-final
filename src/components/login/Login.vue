<template>
    <div>
        <h1 style="font-size: 70px">LOGIN</h1>
        <div style="margin-top: 50px">
            <input type="text" name="username" placeholder="email" v-model="form.email" style="color:black;">
        </div>
        <div style="margin-top: 50px;">
            <input type="password" name="password" placeholder="password" v-model="form.password" style="color:black;">
        </div>
        <div style="color: black; margin-top: 50px;">
            <button style="background-color:white; padding: 3px 6px" @click="login">LOGIN</button>
        </div>
    </div>
</template>

<script>
import AuthUser from "../../store/authUser"
export default {
    data(){
        return{
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods:{
        async login(){
            let payload = {
                email: this.form.email,
                password: this.form.password
            }
            let res = await AuthUser.dispatch('login', payload)
            this.$swal('Log in Success!', `Welcome ${res.user.name}`, "success")
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>