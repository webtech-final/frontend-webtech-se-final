import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthUser from './authUser'

let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        single: [],
        versus: [],
        data: [],
        match_single: [],
        match_versus: [],
    },
    mutations: {
        fetchSingle(state, {res} ){
          state.single = res.data
        },
        fetchVersus(state, {res} ){
          state.versus = res.data
        },
        addHistory(state, {res}){
          state.data.push(res)
        },
        fetchSinglePlayHistory(state, { res }) {
            state.match_single = res.data
        },
        fetchVersusPlayHistory(state, { res }) {
            state.match_versus = res.data
        },
    },
    actions: {
        async fetchTopSinglePlayHistory({ commit }){
            let url = `${api_endpoint}/api/playHistories/single/top10`
            let res = await axios.get(url)
            commit('fetchSingle', {res})
        },
        async fetchTopVersusPlayHistory({ commit }){
            let url = `${api_endpoint}/api/playHistories/versus/top10`
            let res = await axios.get(url)
            commit('fetchVersus', {res})
        },
        async addHistory({ commit }, payload){
            let url = `${api_endpoint}/api/playHistories`
            let body = payload
            let header = AuthUser.getters.header
            let res = await axios.post(url, body, header)
            commit('addHistory', res.data)
        },
        async fetchSinglePlayHistory({ commit }) {
            let user_id = AuthUser.getters.user.id;
            let url = `${api_endpoint}/api/playHistories/singleplayer/${user_id}`;
            let res = await axios.get(url);
            commit("fetchSinglePlayHistory", { res });
        },
        async fetchVersusPlayHistory({ commit }) {
            let user_id = AuthUser.getters.user.id;
            let url = `${api_endpoint}/api/playHistories/versusplayer/${user_id}`;
            let res = await axios.get(url);
            commit("fetchVersusPlayHistory", { res });
        }
    },
    modules: {
    },
    getters:{
        single: (state) => state.single,
        versus: (state) => state.versus,
        data: (state) => state.data,
        match_single: (state) => state.match_single,
        match_versus: (state) => state.match_versus,
    }
})
