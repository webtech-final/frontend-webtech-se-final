import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AuthUser from './authUser'

let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        transactions: []
    },
    getters: {
        transactions: (state) => state.transactions
    },
    mutations: {
        fetchPointHistory(state, { res }) {
            state.transactions = res.data;
        }
    },
    actions: {
        async addPoint({ commit }, payload) {
            let url = `${api_endpoint}/api/pointHistories`;
            let body = payload;
            let header = AuthUser.getters.header
            let res = await axios.post(url, body, header);
        },
        async fetchPointHistory({ commit }) {
            let user_id = AuthUser.getters.user.id;
            let url = `${api_endpoint}/api/pointHistories/${user_id}`;
            let res = await axios.get(url);
            commit("fetchPointHistory", { res });
        }
    },
    modules: {},
});
