<template>
    <div class="mx-96">
        <div class="bg-gray-900 mx-52 rounded-xl">
            <h1 class="font-serif" style="font-size: 70px">LOGIN</h1>
            <div class="mt-10">
                <input class="p-3 w-96 rounded-xl" type="text" name="username" placeholder="email" v-model="form.email" style="color:black;">
                <div>
                    <label for="email error" style="color:red;" v-if="alert.email">{{ alert.email }}</label>
                </div>
            </div>
            <div class="mt-10">
                <input class="p-3 w-96 rounded-xl" type="password" name="password" placeholder="password" v-model="form.password" style="color:black;">
                <div>
                    <label for="password error" style="color:red;" v-if="alert.password">{{ alert.password }}</label>
                </div>
            </div>
            <div class="mt-10 pb-10">
                <button class="bg-blue-500 hover:bg-blue-600 text-xl w-96 rounded-xl p-3" @click="login">LOGIN</button>
            </div>
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
            },
            alert: {
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
            if(res ==="admin"){
                this.alert = {
                    email: '',
                    password: ''
                }
                this.$swal({title: "You are admin", icon:"warning"})
            }
            else if(res.status === 401){
                this.alert = {
                    email: '',
                    password: ''
                }
                this.$swal("Login Failed","your email or password is incorrect","error")
            }
            else if(res.status === 422){
                if(typeof res.data.email === 'undefined'){
                    this.alert.email = ''
                }else{ 
                    this.alert.email = res.data.email[0]
                }
                if(typeof res.data.password === 'undefined'){
                    this.alert.password = ''
                }else{
                    this.alert.password = res.data.password[0]
                }
            }
            else{
                this.$swal('Log in Success!', `Welcome ${res.data.user.name}`, "success")
                this.$router.push('/')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>