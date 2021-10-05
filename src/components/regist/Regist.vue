<template>
    <div>
        <h1 style="font-size: 70px; padding-top: 100px">SIGNUP</h1>
        <div style="margin-top: 50px">
            <input type="text" name="username" placeholder="name" v-model="form.name" style="color:black;">
        </div>
        <div style="margin-top: 50px">
            <input type="email" name="email" placeholder="email" v-model="form.email" style="color:black;">
        </div>
        <div style="margin-top: 50px">
            <input type="password" name="password" placeholder="password" v-model="form.password" style="color:black;">
        </div>
        <div style="margin-top: 50px">
            <input type="password" name="confirmPassword" placeholder="confirm password" v-model="form.confirmPassword" style="color:black">
        </div>
        <div style="margin-top: 50px;color: black">
            <button style="background-color:white; padding: 3px 6px" @click="signup">SIGN UP</button>
        </div>
    </div>
</template>

<script>
import AuthUser from '../../store/authUser'
export default {
    data(){
        return{
            form:{
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods:{
        async signup(){
            let payload = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                password_confirmation: this.form.confirmPassword
            }
            let res = await AuthUser.dispatch('register', payload)
            this.$swal('Log in Success!', `Welcome ${res.user.name}`,"success")
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>