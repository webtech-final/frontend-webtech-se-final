<template>
    <div id="multi" class="flex justify-center">
        <div id="wait" class="pt-10 text-3xl text-white text-center" v-if="showWait">
            <h1 v-if="roomPin">
                Waiting for another player
                <div class="dot-flashing inline-flex ml-5"></div>
            </h1>
            <h1 class="text-2xl pt-5">
                {{ roomPin ? 'YOUR ROOM PIN:' : ' '
                }}<label class="font-bold">
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
                    this.reset();
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
.dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
}

.dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
}

.dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
}

@keyframes dotFlashing {
    0% {
        background-color: #9880ff;
    }
    50%,
    100% {
        background-color: #ebe6ff;
    }
}
</style>
