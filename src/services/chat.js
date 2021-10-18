import {io} from 'socket.io-client'
import Chat from '../store/chat'

class SocketioService{
    socket;
    constructor(){}

    setupSocketConnection(name){
        this.socket = io(process.env.VUE_APP_WEBSOCKET_ENDPOINT);
        Chat.commit('setSocket', this.socket)
        this.chat(`${name} connect`)
        Chat.commit('clearMessage')
    }

    chat(msg){
        this.socket.emit('message', msg)
    }
    
    newChat(){
        this.socket.on('new_message', (msg) =>{
            Chat.commit('newMessage',msg)
        })
    }
    remove(name){
        this.chat(`${name} disconnect`)
        this.socket.removeAllListeners();
    }
}

export default new SocketioService();