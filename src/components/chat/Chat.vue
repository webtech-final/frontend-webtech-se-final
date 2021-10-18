<template>
    <div class="mx-96">
        <div class="bg-gray-500 mx-96 p-2 rounded">
            <div class="pb-2">
                <div class="h-36 w-full bg-gray-200 rounded p-2 overflow-y-scroll pb-8" id="chat">
                    <div v-for="(chat,index) in chats" :key="index">
                        <label for="chat" class="break-all">{{chat}}</label>
                    </div>
                </div>
            </div>
            <div class="bg-yellow-500 rounded">
                <form class="flex justify-center" @submit.prevent="send">
                    <input class="w-full rounded p-2" type="text" placeholder="message" v-model="message">
                    <button class="mx-2" type="submit">SEND</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Socketio from '../../services/chat'
import Auth from '../../store/authUser'
import Chat from '../../store/chat'
export default {
    data(){
        return{
            name: '',
            socket: '',
            message: '',
            chats: []
        }
    },
    methods:{
        send(){
            Socketio.chat(`${this.name}: ${this.message}`)
            this.message = '';
        }
    },
    created(){
        this.name = Auth.getters.user.name
    },
    mounted(){
        Socketio.setupSocketConnection(this.name)
        Socketio.newChat()
        this.chats = Chat.getters.chats
    },
    beforeDestroy(){
        Socketio.remove(this.name)
    }
}
</script>

<style scoped></style>