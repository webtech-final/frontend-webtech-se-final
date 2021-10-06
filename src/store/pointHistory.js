import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        async addPoint({ commit }, payload) {
            let url = `${api_endpoint}/api/pointHistories`;
            let body = payload;
            let res = await axios.post(url, body);
        },
    },
    modules: {},
});
