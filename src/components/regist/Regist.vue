<template>
    <div>
        <h1 style="font-size: 70px; padding-top: 100px">SIGNUP</h1>
        <div style="margin-top: 50px">
            <input type="text" name="username" placeholder="username" v-model="form.username">
        </div>
        <div style="margin-top: 50px">
            <input type="email" name="email" placeholder="email" v-model="form.email">
        </div>
        <div style="margin-top: 50px">
            <input type="password" name="password" placeholder="password" v-model="form.password">
        </div>
        <div style="margin-top: 50px">
            <input type="password" name="confirmPassword" placeholder="confirm password" v-model="form.confirmPassword">
        </div>
        <div style="margin-top: 50px;color: black">
            <button style="background-color:white; padding: 3px 6px">SIGN UP</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    }
}
</script>

<style>

</style>