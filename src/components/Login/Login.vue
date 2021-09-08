<template>
    <div>
        <h1 style="font-size: 70px">LOGIN</h1>
        <div style="margin-top: 50px">
            <input type="text" name="username" placeholder="username" v-model="form.username">
        </div>
        <div style="margin-top: 50px;">
            <input type="password" name="password" placeholder="password" v-model="form.password">
        </div>
        <div style="color: black; margin-top: 50px;">
            <button style="background-color:white; padding: 3px 6px">LOGIN</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: {
                username: '',
                password: ''
            }
        }
    }
}
</script>

<style>

</style>