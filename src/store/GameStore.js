import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        clientNumber: '',
        gameCode: '',
    },
    getters: {
        getClientNumber: state => state.clientNumber,
        getGameCode: state => state.gameCode,
    },
    mutations: {
        setClientNumber(state, number) {
            state.clientNumber = number;
        },
        setGameCode(state, code) {
            state.gameCode = code;
        },
    },
    actions: {
    },
    modules: {},
});
