import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        clientNumber: '',
        gameCode: '',
        socket : '',
    },
    getters: {
        getClientNumber: state => state.clientNumber,
        getGameCode: state => state.gameCode,
        getSocket: state => state.socket
    },
    mutations: {
        setClientNumber(state, number) {
            state.clientNumber = number;
        },
        setGameCode(state, code) {
            state.gameCode = code;
        },
        setSocket(state, socket) {
            state.socket = socket;
        }
    },
    actions: {
    },
    modules: {},
});
