<template>
    <div class="bg-white">
        <h1>Hello World! {{ currentUser.id }}</h1>

        <!-- Edit Profile Picture -->
        <input type="file" name="image" @change="selectedFile($event)">
        <button @click="upload">Update</button>
        <h2 v-text="upload_result"></h2>

        <!-- Edit Name -->
        <input type="text" v-model="new_name">
        <button @click="editName">Update</button>
        <h2 v-text="edit_result"></h2>
    </div>
</template>

<script>
import authUser from "../store/authUser";

export default {
    data() {
        return {
            currentUser: {},
            image: null,
            upload_result: null,
            new_name: authUser.getters.user.name,
            edit_result: null
        }
    },
    methods: {
        selectedFile(event) {
            this.image = event.target.files[0]
        },
        async upload() {
            let payload = {
                image: this.image,
            }
            this.upload_result = await authUser.dispatch('updateProfilePic', payload);
 		},
        async editName() {
            let payload = {
                new_name: this.new_name
            }
            this.edit_result = await authUser.dispatch('updateName', payload);
        }
    },
    created() {
        this.currentUser = authUser.getters.user;
    },
}
</script>

<style></style>

<style lang='scss' scoped></style>