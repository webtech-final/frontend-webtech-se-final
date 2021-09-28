<template>
    <div class="bg">
        <div class="relative pt-16">
            <div style="display: grid; grid template-columns: 100%" class="absolute top-0 mx-auto w-full">
                <h1 class="h1">LEADERBOARD(SINGLE)</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>RANK</th>
                            <th>NAME</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(info,index) in single" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{info.user.name}}</td>
                            <td>{{info.score}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="relative pt-16 ">
            <div style="display: grid; grid template-columns: 100%" class="absolute top-0 mx-auto w-full">
                <h1 class="h1">LEADERBOARD(VERSUS)</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>RANK</th>
                            <th>NAME</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(info,index) in versus" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{info.user.name}}</td>
                            <td>{{info.score}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import PlayHistory from '../../store/playHistory'

export default {
    data(){
        return{
            // infos:[
            //     {
            //         image: '',
            //         name: 'Plume',
            //         point: 20000000
            //     }
            // ],
            single:[],
            versus:[]
        }
    },
    created(){
        this.fetchHistories();
    },
    methods:{
        async fetchHistories(){
            await PlayHistory.dispatch('fetchTopSinglePlayHistory')
            this.single = PlayHistory.getters.single
            await PlayHistory.dispatch('fetchTopVersusPlayHistory')
            this.versus = PlayHistory.getters.versus
        },
    }
}
</script>

<style lang='scss' scoped>
.bg{
    display: grid;
    grid-template-columns: 50% 50%;
}
table,tr{
    color: black;
    margin-right: auto;
    margin-left: auto;
    font-size: 30px;
    border: 15px solid burlywood;
    width: 70%;
}
td{
    background-color: blanchedalmond;
}
th{
    background-color: burlywood;
}
.h1{
    font-size: 50px;
    margin-left: auto;
    margin-right: auto;
    background-color: blanchedalmond;
    color: black;
    padding: 3px 30px;
}
</style>