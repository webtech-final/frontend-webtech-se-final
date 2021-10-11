<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-900">
                            <tr>
                                <th colspan="3" class="px-6 py-3 text-center text-md font-medium text-white uppercase tracking-wider">VERSUS HISTORY</th>
                            </tr>
                        </thead>
                        <thead class="bg-gray-200">
                            <tr>
                                <th scope="col" class="w-1/3 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
                                <th scope="col" class="w-1/3 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">RESULT</th>
                                <th scope="col" class="w-1/3 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">SCORE</th>
                            </tr>
                        </thead>  
                    </table>
                    <div class="bg-white overflow-y-auto h-96">
                        <table class="min-w-full divide-y divide-gray-300">
                            <tbody class="bg-white divide-y divide-gray-300" v-for="(match, index) in matchs" :key="index">
                                <tr v-if="isWin(match)" class="cursor-pointer bg-green-100 hover:bg-green-200" v-on:click="click(match)">
                                    <td class="w-1/3 text-left px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ dateFormater(match.created_at) }}</span>
                                    </td>
                                    <td class="w-1/3 text-center px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ match.result }}</span>
                                    </td>
                                    <td class="w-1/3 text-right px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ match.score }}</span>
                                    </td>
                                </tr>
                                <tr v-else class="cursor-pointer bg-red-100 hover:bg-red-200" v-on:click="click(match)">
                                    <td class="w-1/3 text-left px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ dateFormater(match.created_at) }}</span>
                                    </td>
                                    <td class="w-1/3 text-center px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ match.result }}</span>
                                    </td>  
                                    <td class="w-1/3 text-right px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ match.score }}</span>
                                    </td>     
                                </tr>
                            </tbody>
                        </table>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayHistory from "../../store/playHistory";

export default {
    data() {
        return {
        matchs: [],
        }
    },
    async created() {
        this.fetchVersusPlayHistory();
    },
    methods: {
        async fetchVersusPlayHistory() {
            await PlayHistory.dispatch("fetchVersusPlayHistory");
            this.matchs = PlayHistory.getters.match_versus
        },
        dateFormater(timestamp) {
            let date = new Date(timestamp)
            let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Intl.DateTimeFormat('en-GB', options).format(date)
        },
        fullDateFormater(timestamp) {
            let date = new Date(timestamp)
            let options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
                timeZone: 'Asia/Bangkok'
            };
            return new Intl.DateTimeFormat('en-GB', options).format(date)
        },
        click(match) {
            this.$swal.fire({
                icon: 'info',
                title: "Score : " + match.score,
                html: "<span>Result : </span>" + match.result + "<br /><br />" +
                        "<span>Opponent : </span>" + match.opponent + "<br /><br />" +
                        
                        "<span>Played at : </span>" + this.fullDateFormater(match.created_at),
                confirmButtonText: "Close", 
                confirmButtonColor: "#DD6B55",
            })
        },
        isWin(match) {
            return match.result === 'WIN'
        }
    }
}
</script>

<style lang='scss' scoped></style>