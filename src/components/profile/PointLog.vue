<template>
    <!-- REFERENCE : https://tailwindui.com/components/application-ui/lists/tables#component-d60e8c748260b622747ec1568ba9c509-->
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-900">
                            <tr>
                                <th colspan="2" class="px-6 py-3 text-center text-md font-medium text-white uppercase tracking-wider">POINT LOG</th>
                            </tr>
                        </thead>
                        <thead class="bg-gray-200">
                            <tr>
                                <th scope="col" class="w-1/2 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
                                <th scope="col" class="w-1/2 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">POINT</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(log, index) in logs" :key="index">
                                <td class="text-left px-6 py-4 whitespace-nowrap">
                                    <div class="text-md font-medium text-gray-900">{{ log.date }}</div>
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
export default {
    data() {
        return {
            logs: [
                {
                    date: '01/09/2021',
                    point: 200
                },
                {
                    date: '01/09/2021',
                    point: -100
                },
                {
                    date: '02/09/2021',
                    point: 400
                },
                {
                    date: '03/09/2021',
                    point: 600
                },
                {
                    date: '03/09/2021',
                    point: -1000
                },
                {
                    date: '04/09/2021',
                    point: 800
                },
                {
                    date: '05/09/2021',
                    point: 1000
                },           
            ]
        }
    }
}
</script>
