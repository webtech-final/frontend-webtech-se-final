import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import 'sweetalert2/dist/sweetalert2.min.css';
import './index.css';

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

defineIonPhaser(window);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
