<template>
    <!-- REFERENCE : https://tailwindui.com/components/application-ui/lists/tables#component-d60e8c748260b622747ec1568ba9c509-->
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-900">
                            <tr>
                                <th colspan="3" class="px-6 py-3 text-center text-md font-medium text-white uppercase tracking-wider">PLAY LOG</th>
                            </tr>
                        </thead>
                        <thead class="bg-gray-200">
                            <tr>
                                <th scope="col" class="w-1/3 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
                                <th scope="col" class="w-1/3 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">MODE</th>
                                <th scope="col" class="w-1/3 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">SCORE</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(match, index) in matchs" :key="index">
                                <td class="text-left px-6 py-4 whitespace-nowrap">
                                    <span class="text-md font-medium text-gray-900">{{ match.date }}</span>
                                </td>
                                <td class="text-center px-6 py-4 whitespace-nowrap">
                                    <span class="text-md font-medium text-gray-900">{{ match.mode }}</span>
                                </td>                          
                                <td class="text-right px-6 py-4 whitespace-nowrap">
                                    <span class="text-md font-medium text-gray-900">{{ match.score }}</span>
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
            matchs: [
                {
                    date: '01/09/2021',
                    mode: 'Single',
                    score: 10000
                },
                {
                    date: '02/09/2021',
                    mode: 'Versus',
                    score: 20000
                },
                {
                    date: '03/09/2021',
                    mode: 'Versus',
                    score: 30000
                },
                {
                    date: '04/09/2021',
                    mode: 'Single',
                    score: 40000
                },
                {
                    date: '05/09/2021',
                    mode: 'Versus',
                    score: 50000
                },           
            ]
        }
    }
}
</script>

<style lang='scss' scoped></style>