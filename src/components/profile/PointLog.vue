<template>
    <!-- REFERENCE : https://tailwindui.com/components/application-ui/lists/tables#component-d60e8c748260b622747ec1568ba9c509-->
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-900">
                            <tr>
                                <th colspan="3" class="px-6 py-3 text-center text-md font-medium text-white uppercase tracking-wider">POINT LOG</th>
                            </tr>
                        </thead>
                        <thead class="bg-gray-200">
                            <tr>
                                <th scope="col" class="w-1/3 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
                                <th scope="col" class="w-1/3 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">TYPE</th>
                                <th scope="col" class="w-1/3 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">POINT</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(log, index) in logs" :key="index">
                                <td class="text-left px-6 py-4 whitespace-nowrap">
                                    <span class="text-md font-medium text-gray-900">{{ dateFormater(log.created_at) }}</span>
                                </td>
                                <td class="text-center px-6 py-4 whitespace-nowrap">
                                    <span class="text-md font-medium text-gray-900">{{ log.type.toUpperCase() }}</span>
                                </td>      
                                <td class="text-right px-6 py-4 whitespace-nowrap">
                                    <span class="text-md font-medium text-gray-900">{{ log.point }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PointHistory from "../../store/pointHistory";

export default {
    data() {
        return {
            logs: []
        }
    },
    async created() {
        this.fetchPointHistory();
    },
    methods: {
        async fetchPointHistory() {
            await PointHistory.dispatch("fetchPointHistory");
            this.logs = PointHistory.getters.transactions
        },
        dateFormater(timestamp) {
            let date = new Date(timestamp)
            let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Intl.DateTimeFormat('en-GB', options).format(date)
        },
    }
}
</script>

<style lang='scss' scoped></style>