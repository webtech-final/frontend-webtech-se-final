import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
      async getLastRate({commit}){
          let url = `${api_endpoint}/api/pointRate/last`
          let res = await axios.get(url)
          return res.data
      }
  },
  modules: {
  }
})
