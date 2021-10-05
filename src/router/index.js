import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Profile from '@/views/Profile.vue';
import Leaderboard from '../views/Leaderboard';
import Regist from '../views/Regist.vue';
import Inventory from '../views/Inventory.vue';
import Shop from '../views/Shop.vue';
import Single from '../views/Singleplayer.vue';
import Multi from '../views/Multiplayer.vue';
import Logout from '../views/Logout.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },

    {
        path: '/leaderboard',
        name: 'Leaderboard',
        component: Leaderboard,
    },
    {
        path: '/regist',
        name: 'Regist',
        component: Regist,
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: Inventory,
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop,
    },
    {
        path: '/single',
        name: 'Single',
        component: Single,
    },
    {
        path: '/multi',
        name: 'Multi',
        component: Multi,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
