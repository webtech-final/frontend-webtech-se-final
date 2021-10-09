import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import AuthUser from "../store/authUser";

let api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    block_inven: [],
    back_inven: [],
    block_equipped: {},
    back_equipped: {},
    block_shop: [],
    back_shop: [],
    data: [],
  },
  getters: {
    block_inven: (state) => state.block_inven,
    back_inven: (state) => state.back_inven,
    block_equipped: (state) => state.block_equipped,
    back_equipped: (state) => state.back_equipped,
    block_shop: (state) => state.block_shop,
    back_shop: (state) => state.back_shop,
    data: (state) => state.data,
  },
  mutations: {
    fetchBlockInven(state, { res }) {
      state.block_inven = res.data;
    },
    fetchBackInven(state, { res }) {
      state.back_inven = res.data;
    },
    fetchBlockEquipped(state, { res }) {
      state.block_equipped = res.data;
    },
    fetchBackEquipped(state, { res }) {
      state.back_equipped = res.data;
    },
    fetchBlockShop(state, { res }) {
      state.block_shop = res.data;
    },
    fetchBackShop(state, { res }) {
      state.back_shop = res.data;
    },
  },
  actions: {
    async fetchBlockInventory({ commit }) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/block/inventory/${user_id}`;

      let res = await axios.get(url);

      commit("fetchBlockInven", { res });
    },
    async fetchBackInventory({ commit }) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/background/inventory/${user_id}`;

      let res = await axios.get(url);
      commit("fetchBackInven", { res });
    },
    async fetchBlockEquipped({ commit }) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/block/equipped/${user_id}`;

      let res = await axios.get(url);

      commit("fetchBlockEquipped", { res });
    },
    async fetchBackEquipped({ commit }) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/background/equipped/${user_id}`;

      let res = await axios.get(url);

      commit("fetchBackEquipped", { res });
    },
    async equipItem({ commit }, payload) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/equip/${user_id}`;
      let body = {
        equipped_id: payload.equipped_id,
        equip_id: payload.equip_id,
      };
      let res = await axios.put(url, body);
    },
   
    async fetchBlockShop({ commit }) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/block/shop/${user_id}`;

      let res = await axios.get(url);
      commit("fetchBlockShop", { res });
    },
    async fetchBackShop({ commit }) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/background/shop/${user_id}`;

      let res = await axios.get(url);
      commit("fetchBackShop", { res });
    },
    async buyItem({ commit }, payload) {
      let user_id = AuthUser.getters.user.id;
      let url = `${api_endpoint}/api/items/buy/${user_id}`;
      let body = payload;
      let res = await axios.put(url, body);
    },
  },
  modules: {},
});

