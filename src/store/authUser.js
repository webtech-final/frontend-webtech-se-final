import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let auth_key = "auth_user"
let auth = JSON.parse(localStorage.getItem(auth_key))
let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth? auth.jwt : "",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
  state: {
    state: initialState
  },
  mutations: {
    loginSuccess(state, res){
        state.user = res.user
        state.jwt = res.access_token
        state.isAuthen = true
    },
    logoutSuccess(state){
        state.user = ""
        state.jwt = ""
        state.isAuthen = false
    }
  },
  actions: {
    async login({commit}, {email, password}){
        let url = `${api_endpoint}/api/auth/login`
        let body = {
            email: email,
            password: password
        }
        let res = await axios.post(url, body)
        commit("loginSuccess", res)
        localStorage.setItem(auth_key, JSON.stringify(res))
        return res.data
    },
    // รอดูว่าตอนสมัครเสร็จได้ jwt ไหม
    async register({commit}, {name, email, password}){
        let url = `${api_endpoint}/api/auth/register`
        let body = {
            name: name,
            email: email,
            password: password
        }
        let res = await axios.post(url, body)
        commit("loginSuccess", res.user)
        return res
    },
    async logout({commit}){
        let url  = `${api_endpoint}/api/auth/logout`
        localStorage.removeItem(auth_key)
        let res = await axios.post(url)
        commit("logoutSucceess")
        return res
    }
  },
  modules: {
  },
  getters:{
      user: (state) => state.user,
      jwt: (state) => state.jwt,
      isAuthen: (state) => state.isAuthen
  }
})
