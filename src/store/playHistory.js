import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import authUser from './authUser'

let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        single: [],
        versus: [],
        data: []
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
        },
        async addHistory({ commit }, payload){
            let url = `${api_endpoint}/api/playHistories`
            let body = payload
            // let header = authUser.getApiHeader()
            let res = await axios.post(url,body)
            commit('addHistory', res.data)
        }
    },
    modules: {
    },
    getters:{
      single: (state) => state.single,
      versus: (state) => state.versus,
      data: (state) => state.data
    }
})
