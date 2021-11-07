<template>
    <div>
        <shop-table></shop-table>
    </div>
</template>

<script>
import ShopTable from '@/components/shop/ShopTable.vue';
import AuthUser from '../store/authUser';

export default {
    name: 'Shop',
    components: {
        ShopTable,
    },
    async mounted() {
        if (!this.isAuthen()) {
            this.$swal('Restricted Area', 'You must login first', 'warning');
            this.$router.push('/');
        }
        let res = await this.fetchUser();
    },
    methods: {
        isAuthen() {
            return AuthUser.getters.isAuthen;
        },

        async fetchUser() {
            if (this.isAuthen()) {
                await AuthUser.dispatch('fetchUser');
            }
        },
    },
};
</script>
<style></style>
