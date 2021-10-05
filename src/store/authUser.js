import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let auth_key = 'auth_user';
let auth = JSON.parse(localStorage.getItem(auth_key));
let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';

export default new Vuex.Store({
    state: {
        user: auth ? auth.data.user : '',
        jwt: auth ? auth.data.access_token : '',
        isAuthen: auth ? true : false,
    },
    mutations: {
        loginSuccess(state, res) {
            state.user = res.user;
            state.jwt = res.access_token;
            state.isAuthen = true;
        },
        logoutSuccess(state) {
            state.user = '';
            state.jwt = '';
            state.isAuthen = false;
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            let url = `${api_endpoint}/api/auth/login`;
            let body = {
                email: email,
                password: password,
            };
            let res = await axios.post(url, body);
            commit('loginSuccess', res.data);
            localStorage.setItem(auth_key, JSON.stringify(res));
            return res.data;
        },
        // รอดูว่าตอนสมัครเสร็จได้ jwt ไหม
        async register({ commit }, payload) {
            let url = `${api_endpoint}/api/auth/register`;
            let body = payload;
            let res = await axios.post(url, body);
            commit('loginSuccess', res.data);
            return res.data;
        },
        async logout({ commit }) {
            let url = `${api_endpoint}/api/auth/logout`;
            localStorage.removeItem(auth_key);
            let header = {
                headers: {
                    Authorization: `Bearer ${this.state.jwt}`,
                },
            };
            let res = await axios.post(url, null, header);
            commit('logoutSuccess');
            return res;
        },
        async getPoint({commit}, payload){
            let url = `${api_endpoint}/api/auth/getPoint/${payload.id}`
            let body = {
                point: payload.point
            }
            let header = getApiHeader()
            await axios.put(url, body, header)
        }
    },
    modules: {},
    getters: {
        user: state => state.user,
        jwt: state => state.jwt,
        isAuthen: state => state.isAuthen,
    },
    
})
function getApiHeader(){
        let jwt = JSON.parse(localStorage.getItem(auth_key))
        return{
                headers:{
                    Authorization: `Bearer ${jwt.data.access_token}`
                }
        };
}
