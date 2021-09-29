<template>
    <div id="multi" class="flex justify-center">
        <div id="wait" class="pt-10 text-3xl text-white text-center" v-if="showWait">
            <h1>Waiting for another player ...</h1>
            <h1 class="text-2xl pt-5">
                YOUR ROOM PIN:<label class="font-bold">
                    {{ roomPin ? roomPin : 'Fail to load game pin, Please recreate room' }}
                </label>
            </h1>
        </div>
        <div id="gameScene" ref="gameScene" class="mt-8 flex justify-center items-center">
            <game-multi ref="game1" class="mr-5"></game-multi>
            <opponnect ref="game2"></opponnect>
        </div>
        <!-- <button
            @click="test"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            TEST
        </button> -->
    </div>
</template>

<script>
import GameMulti from '../components/game/GameMulti.vue';
import Opponnect from '../components/game/Opponent.vue';
import GameStore from '../store/GameStore';

export default {
    name: 'Multiplayer',
    data: () => {
        return {
            socket: GameStore.getters.getSocket,
            roomPin: GameStore.getters.getGameCode,
            showWait: true,
        };
    },
    components: {
        GameMulti,
        Opponnect,
    },

    methods: {
        socketInit() {
            this.socket.once('gameOver', clientNumber => {
                console.log(GameStore.getters.getGameScore);
                let msg = '';
                let type = '';
                clientNumber != GameStore.getters.getClientNumber
                    ? ((msg = 'YOU WIN!!'), (type = 1))
                    : ((msg = 'YOU LOSE'), (type = 0));
                this.$swal(
                    msg,
                    'Your score is ' + GameStore.getters.getGameScore,
                    type ? 'success' : 'warning',
                ).then(() => {
                    this.$router.push('/');
                });
            });

            this.socket.once('startGame', () => {
                this.showWait = false;
            });
        },

        reset() {
            GameStore.commit('setClientNumber', '');
            GameStore.commit('setGameCode', '');
            GameStore.commit('setGameScore', '');
        },
    },
    mounted() {
        this.socketInit();
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
