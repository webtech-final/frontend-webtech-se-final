<template>
    <div id="multi" class="flex justify-center">
        <div>
            <div class="pt-10 text-3xl text-white text-center">
                Your User Name: {{ playerName }}
            </div>

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
import AuthUser from '../store/authUser';
import PointRate from '../store/pointRate';
import PlayHistory from '../store/playHistory';
import PointHistory from '../store/pointHistory';

export default {
    name: 'Multiplayer',
    data: () => {
        return {
            socket: GameStore.getters.getSocket,
            roomPin: GameStore.getters.getGameCode,
            playerNumber: '',
            opponentName: '',
            playerName: '',
            showWait: true,
        };
    },
    components: {
        GameMulti,
        Opponnect,
    },

    methods: {
        async socketInit() {
            this.socket.once('gameOver',({ loserNumber, loserName, winnerName }) => {
                let msg = '';
                let type = '';

                if (loserNumber != this.playerNumber) {
                    // this player win
                    msg = 'YOU WIN!!';
                    type = 1;
                } else {
                    // this player lose
                    msg = 'YOU LOSE';
                    type = 0;
                }

                // post score to server
                if (AuthUser.getters.isAuthen) {
                    this.saveHistory(this.opponentName, type ? 'WIN' : 'LOSE');
                    this.getPoint();
                }

                this.$swal(
                    msg,
                    'Your score is ' + GameStore.getters.getGameScore,
                    type ? 'success' : 'warning',
                ).then(() => {
                    this.$router.push('/');
                    this.reset();
                });
            });

            this.socket.once('startGame', ({ playerOneName, playerTwoName }) => {
                this.playerNumber = GameStore.getters.getClientNumber;
                this.opponentName = this.playerNumber == 1 ? playerOneName : playerTwoName;
                this.showWait = false;
            });
        },

        async saveHistory(opponentName, result) {
            let payload = {
                user_id: AuthUser.getters.user.id,
                score: GameStore.getters.getGameScore,
                mode: 'versus',
                opponent: opponentName,
                result: result,
            };
            await PlayHistory.dispatch('addHistory', payload);
        },
        async getPoint() {
            let rate = await PointRate.dispatch('getLastRate');
            rate = parseInt(rate);
            let score = GameStore.getters.getGameScore;
            score = parseInt(score);
            let point = score / rate;
            point = Math.floor(point);
            let payload = {
                id: AuthUser.getters.user.id,
                point: point,
            };
            await AuthUser.dispatch('getPoint', payload);
            let payload1 = {
                user_id: AuthUser.getters.user.id,
                point: point,
                type: 'get',
            };
            await PointHistory.dispatch('addPoint', payload1);
        },

        isAuthen() {
            return AuthUser.getters.isAuthen;
        },

        reset() {
            GameStore.commit('setClientNumber', '');
            GameStore.commit('setGameCode', '');
            GameStore.commit('setGameScore', '');
            GameStore.commit('setGuestName', '');
        },

        setPlayerName() {
            this.playerName = AuthUser.getters.isAuthen
                ? AuthUser.getters.user.name
                : GameStore.getters.getGuestName;
        },
    },
    created() {
        this.socketInit();
        this.setPlayerName();
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
