<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-900">
                            <tr>
                                <th colspan="2" class="px-6 py-3 text-center text-md font-medium text-white uppercase tracking-wider">SINGLEPLAYER HISTORY</th>
                            </tr>
                        </thead>
                        <thead class="bg-gray-200">
                            <tr>
                                <th scope="col" class="w-1/2 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
                                <th scope="col" class="w-1/2 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">SCORE</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="bg-white overflow-y-auto h-96">
                        <table class="min-w-full divide-y divide-gray-200">
                            <tbody class="bg-yellow-100 divide-y divide-gray-300">
                                <tr class="cursor-pointer hover:bg-yellow-200" v-for="(match, index) in matchs" :key="index" v-on:click="click(match)">
                                    <td class="text-left px-6 py-4 whitespace-nowrap">
                                        <span class="text-md font-medium text-gray-900">{{ dateFormater(match.created_at) }}</span>
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
        this.fetchSinglePlayHistory();
    },
    methods: {
        async fetchSinglePlayHistory() {
            await PlayHistory.dispatch("fetchSinglePlayHistory");
            this.matchs = PlayHistory.getters.match_single
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
                html: "<span>Played at : </span>" + this.fullDateFormater(match.created_at),
                confirmButtonText: "Close", 
                confirmButtonColor: "#DD6B55",
            })
        },
    }
}
</script>

<style lang='scss' scoped></style>