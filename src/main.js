import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader'
import './index.css';

Vue.use(new VueSocketIO({
    // debug: true,
    connection: io('http://localhost:3000'),
}))

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

defineIonPhaser(window);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
