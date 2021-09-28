import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        single: [],
        versus: []
    },
    mutations: {
      fetchSingle(state, {res} ){
          state.single = res.data
      },
      fetchVersus(state, {res} ){
        state.versus = res.data
      }
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
        }
    },
    modules: {
    },
    getters:{
      single: (state) => state.single,
      versus: (state) => state.versus
    }
})
