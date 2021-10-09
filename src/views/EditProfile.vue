<template>
    <div class="bg-white">
        <h1>Hello World! {{ currentUser.id }}</h1>

        <input type="file" name="image" @change="selectedFile($event)">
        <button @click="upload">Update</button>
        <h2 v-text="upload_result"></h2>
    </div>
</template>

<script>
import authUser from "../store/authUser";

export default {
    data() {
        return {
            currentUser: {},
            image: null,
            upload_result: null
        }
    },
    methods: {
        selectedFile(event) {
            this.image = event.target.files[0]
        },
        async upload() {
            let payload = {
                'image': this.image,
            }
            this.upload_result = await authUser.dispatch('updateProfilePic', payload);
 		}
    },
    created() {
        this.currentUser = authUser.getters.user;
    },
}
</script>

<style></style>

<style lang='scss' scoped></style>