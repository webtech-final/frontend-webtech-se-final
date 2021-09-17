<template>
    <div class="text-white">
        <h1>This is TEST page for socket.io</h1>
        <button @click="test">
            TEST
        </button>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: "test",
    data() {
        return {
            socket: io('http://localhost:3000'),
            users: ["TESTUSER"],
        };
    },
    methods: {
        test() {
            console.log("TEST")
            this.socket.emit('sendUpdateUsers', { users: this.users });
        },
    },

    created() {
        this.socket.on('usersUpdate', data => {
            console.log(data)
            this.users = data.users;
        });
    },
};
</script>

<style scoped></style>
