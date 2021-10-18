import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)
let socket_endpoint = process.env.VUE_APP_WEBSOCKET_ENDPOINT || 'http://localhost:3000';
let socket = io(socket_endpoint)

export default new Vuex.Store({
  state: {
      socket: '',
      chats: []
  },
  getters:{
      socket: state=> state.socket,
      chats: state => state.chats
  },
  mutations: {
      setSocket(state, socket){
          state.socket = socket
      },
      newMessage(state, chat){
          state.chats.push(chat)
      },
      clearMessage(state){
          state.chats = []
      }
  },
  actions: {
  },
  modules: {
  }
})
