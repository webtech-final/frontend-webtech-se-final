<template>
    <div>
        <div class="mt-10 mx-80 p-10 justify-items-center bg-gray-300 rounded-lg">
            <div class="text-5xl">Change Profile Picture</div>
            <br /><br />
            <div>
                <input class="text-3xl" type="file" name="image" @change="selectedFile($event)" />
                <div
                    v-if="isUploadSuccess()"
                    class="text-2xl text-green-500"
                    v-text="upload_result"
                ></div>
                <div v-else class="text-2xl text-red-500" v-text="upload_result"></div>
            </div>
            <br />
            <div>
                <button
                    class="text-2xl bg-green-400 hover:bg-green-500 rounded-lg p-2"
                    @click="upload"
                >
                    Apply
                </button>
            </div>
        </div>
        <div class="mt-10 mx-80 p-10 justify-items-center bg-gray-300 rounded-lg">
            <div class="text-5xl">Change Name</div>
            <br /><br />
            <div>
                <input class="text-3xl" type="text" v-model="new_name" />
                <div
                    class="text-2xl text-green-500"
                    v-if="isEditNameSuccess()"
                    v-text="edit_result"
                ></div>
                <div class="text-2xl text-red-500" v-else v-text="edit_result"></div>
            </div>
            <br />
            <div>
                <button
                    class="text-2xl bg-green-400 hover:bg-green-500 rounded-lg p-2"
                    @click="editName"
                >
                    Apply
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import authUser from '../store/authUser';

export default {
    data() {
        return {
            currentUser: {},
            image: null,
            upload_result: null,
            new_name: authUser.getters.user.name,
            edit_result: null,
        };
    },
    methods: {
        selectedFile(event) {
            this.image = event.target.files[0];
        },
        async upload() {
            let payload = {
                image: this.image,
            };
            this.upload_result = await authUser.dispatch('updateProfilePic', payload);
        },
        async editName() {
            let payload = {
                new_name: this.new_name,
            };
            this.edit_result = await authUser.dispatch('updateName', payload);
        },
        isUploadSuccess() {
            return this.upload_result === 'success';
        },
        isEditNameSuccess() {
            return this.edit_result === 'success';
        },
    },
    created() {
        this.currentUser = authUser.getters.user;
    },
};
</script>

<style></style>

<style lang="scss" scoped></style>
