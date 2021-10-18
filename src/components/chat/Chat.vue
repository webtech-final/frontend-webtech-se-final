<template>
    <div>
        <div class="bg">
            <div class="chatbox">
                <div v-for="(chat,index) in chats" :key="index">
                    <label for="chat">{{chat}}</label>
                </div>
            </div>
        </div>
        <form class="bg" @submit.prevent="send">
            <input type="text" placeholder="message" v-model="message">
            <button type="submit" style="margin-left: 15px">Send</button>
        </form>
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

<style scoped>
.chatbox{
    background-color: black;
    color: white;
    width: 300px;
    height: 150px;
    margin-bottom: 20px;
    overflow-y: scroll;
    text-align: left;
    padding: 15px;
}
.bg{
    display: flex;
    justify-content: center;
    text-align: center;
}
</style>