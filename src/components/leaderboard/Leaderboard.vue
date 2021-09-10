<template>
    <div class="relative pt-16">
        <div style="display: grid; grid template-columns: 100%" class="absolute top-0 mx-auto w-full">
            <h1 class="h1">LEADERBOARD</h1>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>RANK</th>
                        <th></th>
                        <th>NAME</th>
                        <th>POINT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(info,index) in infos" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{info.image}}</td>
                        <td>{{info.name}}</td>
                        <td>{{info.point}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            infos:[
                {
                    image: '',
                    name: 'Plume',
                    point: 20000000
                },
                {
                    image: '',
                    name: 'Plume',
                    point: 2000100
                },
                {
                    image: '',
                    name: 'Big',
                    point: 2000000
                },
                {
                    image: '',
                    name: 'DOOM',
                    point: 20000
                },
                {
                    image: '',
                    name: 'Aui',
                    point: 2488
                },
            ]
        }
    }
}
</script>

<style lang='scss' scoped>
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