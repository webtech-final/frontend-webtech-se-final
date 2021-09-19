<template>
    <div id="multi" class="flex justify-center">
        <!-- <div ref='join' class="flex">
            <enter-room @join="handleJoin" class="m-auto"></enter-room>
        </div> -->
        <div id="gameScene" ref="gameScene" class="mt-8 flex">
            <game class="mr-8" ref='game1'></game>
            <game ref='game2'></game>
        </div>
        <button @click="test" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            TEST
        </button>
    </div>
</template>

<script>
import io from "socket.io-client";
import Game from '../components/game/Game.vue';
import GameStore from '../store/GameStore';

export default {
    name: 'Multiplayer',
    data: () => {
        return {
            socket : io("http://localhost:3000")
        }
    },
    components: {
        Game,
    },

    methods: {
        handleJoin() {
            this.$refs.gameScene.style.display = 'flex';
            this.$refs.join.style.display = 'none';
            this.$refs.game1.initializeGame();
            this.$refs.game2.initializeGame();
            console.log("TEST")
        },

        test() {
            const number = GameStore.getters.getClientNumber;
            console.log(number);
        },

        init() {
            this.socket.on('init', (number) => {
                console.log(number);
                GameStore.commit('setClientNumber', number);
            })
        }
    },
    created() {
        this.socket.on('init', (number) => {
                console.log(number);
                GameStore.commit('setClientNumber', number);
            });
    },
};
</script>

<style scoped>
/* #gameScene {
    display: none;
}

#multi {
    height: 90vh;
} */
</style>