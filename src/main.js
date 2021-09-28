import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader'
import './index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios)

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

defineIonPhaser(window);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
