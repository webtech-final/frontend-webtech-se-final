<template>
    <!-- REFERENCE : https://tailwindcomponents.com/component/profile-card-with-image-background -->
    <div class="card-bg rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased">
        <div class="w-1/6">
            <img v-if="!this.isProfilePicNull()" class="h-64 w-64 rounded-lg shadow-lg antialiased text-gray-300" v-bind:src="picPath()" alt="Profile Picture">
            <img v-else class="h-64 w-64 rounded-lg shadow-lg antialiased text-gray-300" v-bind:src="`${defaultPicture}`" alt="Profile Picture">  
        </div>
        <div class="w-5/6 pl-5 flex flex-row flex-wrap">
            <div class="w-full text-left text-gray-700 font-semibold relative pt-0">
                <div class="text-5xl text-white leading-tight">{{ currentUser.name }}</div><br>
                <div class="text-2xl text-gray-300">
                    <div>Email: <b>{{ currentUser.email }}</b></div>
                    <div>Point: <b>{{ currentUser.point }}</b></div>
                </div>
                <div class="text-xl text-gray-300 absolute pt-0 bottom-0 right-0">Joined Date: <b>{{ this.dateFormatter(currentUser.created_at) }}</b></div>
            </div>
        </div>
        <router-link class="bg-red-300" :to="{name: 'EditProfile'}">Edit Profile</router-link>
    </div>
</template>

<script>
import authUser from "../../store/authUser";
let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';

export default {
    data() {
        return {
            currentUser: {},
            defaultPicture: "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
        }
    },
    created() {
        this.currentUser = authUser.getters.user;
    },
    methods: {
        dateFormatter(date) {
            return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date));
        },
        isProfilePicNull() {
            return this.currentUser.image === null;
        },
        picPath() {
            return api_endpoint + "/" + this.currentUser.image;
        }
    }
}
</script>

<style>
.card-bg {
    background-image: url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
}
</style>

<style lang='scss' scoped></style>