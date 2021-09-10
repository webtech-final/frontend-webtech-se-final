<template>
    <!-- REFERENCE : https://tailwindcomponents.com/component/profile-card-with-image-background -->
    <div class="card-bg rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased">
        <div class="w-1/6">
            <img class="w-full rounded-lg shadow-lg antialiased text-gray-300" v-bind:src="`${player.image}`" alt="Profile Picture">  
        </div>
        <div class="w-5/6 pl-5 flex flex-row flex-wrap">
            <div class="w-full text-left text-gray-700 font-semibold relative pt-0">
                <div class="text-5xl text-white leading-tight">{{ player.name }}</div><br>
                <div class="text-2xl text-gray-300">
                    <div>Email: <b>{{ player.email }}</b></div>
                    <div>Point: <b>{{ player.point }}</b></div>
                </div>
                <div class="text-xl text-gray-300 absolute pt-0 bottom-0 right-0">Last Login: <b>{{ player.last_login }}</b></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            player: {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjDV-TLDsisFFnzjLHq_KhD8SNsPXbJK--cD2bC8A4aZxM3DiDDpA7QNgbMHtGkbLcC-U&usqp=CAU',
                name: 'MusKKunG[TH]',
                email: 'inw_musk_za_007@tesla.com',
                point: 2000000,
                last_login: '09/09/2021',
            },
        }
    }
}
</script>

<style>
.card-bg {
    background-image: url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    background-repeat: no-repat;
    background-size: cover;
    background-blend-mode: multiply;
}
</style>

<style lang='scss' scoped></style>