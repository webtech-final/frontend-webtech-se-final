import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

Vue.use(Vuex);

const websocket_endpoint = process.env.VUE_APP_WEBSOCKET_ENDPOINT || 'http://localhost:3000';
const socket = io(websocket_endpoint);

export default new Vuex.Store({
    state: {
        clientNumber: '',
        gameCode: '',
        gameScore: '',
        socket: socket,
    },
    getters: {
        getClientNumber: state => state.clientNumber,
        getGameCode: state => state.gameCode,
        getSocket: state => state.socket,
        getGameScore: state => state.gameScore,
    },
    mutations: {
        setClientNumber(state, number) {
            state.clientNumber = number;
        },
        setGameCode(state, code) {
            state.gameCode = code;
        },
        setGameScore(state, score) {
            state.gameScore = score;
        },
        setSocket(state, socket) {
            state.socket = socket;
        },
    },
    actions: {},
    modules: {},
});
