<template>
    <div class="bg pt-20 text-center">
        <div class="relative">
            <div
                style="display: grid; grid template-columns: 100%"
                class="absolute top-0 mx-auto w-full -mt-8"
            >
                <div class="h1 bg-yellow-50 mx-52 rounded-lg p-3">
                    <div class="font-serif text-3xl text-center">LEADERBOARD</div>
                    <div id="single" class="font-mono text-xl text-center">(SINGLEPLAYER)</div>
                </div>
            </div>
            <div
                class="mt-6 mx-24 bg-gray-900 rounded-lg pb-5 pt-10 px-5 border-2 border-yellow-50"
            >
                <table class="min-w-full">
                    <thead>
                        <tr class="font-serif text-gray-200">
                            <th class="w-1/6">RANK</th>
                            <th class="w-1/6">PICTURE</th>
                            <th class="w-2/6">NAME</th>
                            <th class="w-2/6">SCORE</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-8 divide-gray-900">
                        <tr
                            class="cursor-pointer p-16 bg-yellow-100 hover:bg-yellow-200"
                            v-for="(info, index) in single"
                            :key="index"
                            v-on:click="clickSingle(info)"
                        >
                            <td v-if="index < 3" class="font-serif text-3xl text-yellow-800">
                                {{ index + 1 }}
                            </td>
                            <td v-else class="font-serif text-2xl">{{ index + 1 }}</td>
                            <td>
                                <div class="py-1 px-8">
                                    <img
                                        v-if="!isProfilePicNull(info.user.image)"
                                        class="w-12 h-12 rounded-lg shadow-lg"
                                        v-bind:src="`${picPath(info.user.image)}`"
                                        alt=""
                                    />
                                    <img
                                        v-else
                                        class="w-12 h-12 rounded-lg shadow-lg"
                                        v-bind:src="`${defaultPicture}`"
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td class="text-2xl text-left font-mono">{{ info.user.name }}</td>
                            <td class="text-3xl font-mono">{{ info.score }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="relative">
            <div
                style="display: grid; grid template-columns: 100%"
                class="absolute top-0 mx-auto w-full -mt-8"
            >
                <div class="h1 bg-yellow-50 mx-52 rounded-lg p-3">
                    <div class="font-serif text-3xl text-center">LEADERBOARD</div>
                    <div id="versus" class="font-mono text-xl text-center">(VERSUS)</div>
                </div>
            </div>
            <div
                class="mt-6 mx-24 bg-gray-900 rounded-lg pb-5 pt-10 px-5 border-2 border-yellow-50"
            >
                <table class="min-w-full">
                    <thead>
                        <tr class="font-serif text-gray-200">
                            <th class="w-1/6">RANK</th>
                            <th class="w-1/6">PICTURE</th>
                            <th class="w-2/6">NAME</th>
                            <th class="w-2/6">SCORE</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-8 divide-gray-900">
                        <tr
                            class="cursor-pointer p-16 bg-yellow-100 hover:bg-yellow-200"
                            v-for="(info, index) in versus"
                            :key="index"
                            v-on:click="clickVersus(info)"
                        >
                            <td v-if="index < 3" class="font-serif text-3xl text-yellow-800">
                                {{ index + 1 }}
                            </td>
                            <td v-else class="font-serif text-2xl">{{ index + 1 }}</td>
                            <td>
                                <div class="py-1 px-8">
                                    <img
                                        v-if="!isProfilePicNull(info.user.image)"
                                        class="w-12 h-12 rounded-lg shadow-lg"
                                        v-bind:src="`${picPath(info.user.image)}`"
                                        alt=""
                                    />
                                    <img
                                        v-else
                                        class="w-12 h-12 rounded-lg shadow-lg"
                                        v-bind:src="`${defaultPicture}`"
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td class="text-2xl text-left font-mono">{{ info.user.name }}</td>
                            <td class="text-3xl font-mono">{{ info.score }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import PlayHistory from '../../store/playHistory';
let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';

export default {
    data() {
        return {
            single: [],
            versus: [],
            defaultPicture:
                'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png',
        };
    },
    async created() {
        await this.fetchHistories();
        console.dir(this.single);
        console.dir(this.versus);
    },
    methods: {
        async fetchHistories() {
            await PlayHistory.dispatch('fetchTopSinglePlayHistory');
            this.single = PlayHistory.getters.single;
            await PlayHistory.dispatch('fetchTopVersusPlayHistory');
            this.versus = PlayHistory.getters.versus;
        },
        picPath(laravelPath) {
            return api_endpoint + '/' + laravelPath;
        },
        isProfilePicNull(imagePath) {
            return imagePath === null;
        },
        fullDateFormater(timestamp) {
            let date = new Date(timestamp);
            let options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: 'Asia/Bangkok',
            };
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        },
        clickSingle(match) {
            this.$swal.fire({
                icon: 'info',
                title: 'Score : ' + '<b>' + match.score + '</b>',
                html:
                    '<span><i>Player</i> : </span>' +
                    '<b>' +
                    match.user.name +
                    '</b>' +
                    '<br /><br />' +
                    '<span><i>Played at</i> : </span>' +
                    '<b>' +
                    this.fullDateFormater(match.created_at) +
                    '</b>',
                confirmButtonText: 'Close',
                confirmButtonColor: '#DD6B55',
            });
        },
        clickVersus(match) {
            this.$swal.fire({
                icon: 'info',
                title: 'Score : ' + '<b>' + match.score + '</b>',
                html:
                    '<span><i>Result</i> : </span>' +
                    '<b>' +
                    match.result +
                    '</b>' +
                    '<br /><br />' +
                    '<span><i>Player</i> : </span>' +
                    '<b>' +
                    match.user.name +
                    '</b>' +
                    '<br /><br />' +
                    '<span><i>Opponent</i> : </span>' +
                    '<b>' +
                    match.opponent +
                    '</b>' +
                    '<br /><br />' +
                    '<span><i>Played at</i> : </span>' +
                    '<b>' +
                    this.fullDateFormater(match.created_at) +
                    '</b>',
                confirmButtonText: 'Close',
                confirmButtonColor: '#DD6B55',
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.bg {
    display: grid;
    grid-template-columns: 50% 50%;
}
</style>
