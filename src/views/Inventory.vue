<template>
    <div>
        <inventory-table></inventory-table>
    </div>
</template>

<script>
import InventoryTable from '@/components/inventory/InventoryTable.vue';
import AuthUser from '../store/authUser';

export default {
    name: 'Inventory',
    components: {
        InventoryTable,
    },
    async mounted() {
        if (!this.isAuthen()) {
            this.$swal('Restricted Area', 'You must login first', 'warning');
            this.$router.push('/');
        }
        await this.fetchUser;
    },
    methods: {
        isAuthen() {
            return AuthUser.getters.isAuthen;
        },
        async fetchUser() {
            if (this.isAuthen()) {
                await authUser.dispatch('fetchUser');
            }
        },
    },
};
</script>
<style></style>
