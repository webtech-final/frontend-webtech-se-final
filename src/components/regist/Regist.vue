<template>
    <div class="mx-96 pt-20">
        <div class="bg-gray-900 mx-52 rounded-xl">
            <h1 class="font-serif" style="font-size: 70px;">SIGN UP</h1>
            <div style="margin-top: 40px">
                <input class="p-3 w-96 rounded-xl" type="text" name="username" placeholder="name" v-model="form.name" style="color:black;">
                <div style="margin-top: 10px;">
                    <label for="name error" style="color:red;" v-if="error.name">{{ error.name }}</label>
                </div>
            </div>
            <div style="margin-top: 40px">
                <input class="p-3 w-96 rounded-xl" type="email" name="email" placeholder="email" v-model="form.email" style="color:black;">
                <div style="margin-top: 10px;">
                    <label for="email error" style="color:red;" v-if="error.email">{{ error.email }}</label>
                </div>
            </div>
            <div style="margin-top: 40px">
                <input class="p-3 w-96 rounded-xl" type="password" name="password" placeholder="password" v-model="form.password" style="color:black;">
                <div style="margin-top: 10px;">
                    <label for="password error" style="color:red;" v-if="error.password">{{ error.password }}</label>
                </div>
            </div>
            <div style="margin-top: 40px">
                <input class="p-3 w-96 rounded-xl" type="password" name="confirmPassword" placeholder="confirm password" v-model="form.confirmPassword" style="color:black">
                <div style="margin-top: 10px;">
                    <label for="confirm password error" style="color:red;" v-if="error.confirmPassword">{{ error.confirmPassword }}</label>
                </div>
            </div>
            <div class="mt-10 pb-10">
                <button class="bg-blue-500 hover:bg-blue-600 text-xl w-96 rounded-xl p-3" @click="signup">SIGN UP</button>
            </div>
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
            },
            error:{
                name: '',
                email: '',
                password:'',
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
            if(res.status===400){
                //validation
                if(typeof res.data.name === 'undefined'){
                    this.error.name = ''
                }else{
                    this.error.name = res.data.name[0]
                }
                if(typeof res.data.email === 'undefined'){
                    this.error.email = ''
                }else{
                    this.error.email = res.data.email[0]
                }
                if(typeof res.data.password === 'undefined'){
                    this.error.password = ''
                    this.error.confirmPassword = ''
                }else{
                    if(res.data.password[0].includes('match')){
                        this.error.password = ''
                        this.error.confirmPassword = res.data.password[0]
                    }else{
                        this.error.password = res.data.password[0]
                        this.error.confirmPassword = res.data.password[1]
                    }
                }
                this.$swal({title:'Register Failed', icon:'error'})
            }else if(res.status===201){
                this.$swal({title:'Register Success!', icon:"success"})
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style>

</style>