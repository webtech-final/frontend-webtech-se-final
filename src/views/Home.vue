<template>
    <div class="home mt-72">
        <div
            class="
				text-gray-300 text-6xl
				w-1/2
				font-bold
				mx-auto
				flex
				justify-center
				items-end
			"
        >
            <div class="mb-3">
                <a class="text-8xl" id="logo-p1">TERTIS</a>
                <a class="text-5xl" id="logo-p2">.VS</a>
            </div>
        </div>
        <div class="text-gray-300 my-4 relative w-1/4 mx-auto">
            <input
                class="
					input
					border border-gray-400
					appearance-none
					rounded
					w-full
					px-3
					py-3
					pt-5
					pb-2
					focus
					focus:border-indigo-600
					focus:outline-none
					active:outline-none
					active:border-indigo-600
                    text-gray-600
				"
                id=""
                type="text"
                autofocus
                v-model="inputPlayerName"
                v-if="!isAuthen()"
            />
            <label
                class="
					mt-2
					-mt-2
					label
					absolute
					mb-0
					pt-4
					pl-3
                    text-gray-300
				t
				"
                v-if="!isAuthen() && !inputPlayerName"
                >Username</label
            >
            <div class="grid grid-cols-3 my-4">
                <div class="my-5 flex justify-center space-x-10">
                    <label for="1P" class="font-bold">1 PLAYER</label>
                </div>
                <div class="col-span-2">
                    <router-link to="/single">
                        <button
                            class="
								py-3
								px-6
								text-white
								rounded-lg
								bg-green-400
								shadow-lg
								block
								md:inline-block
								w-28
							"
                        >
                            PLAY
                        </button>
                    </router-link>
                </div>
                <div class="my-5 flex justify-self-center space-x-10">
                    <label for="2P" class="font-bold">2 PLAYER</label>
                </div>
                <div>
                    <button
                        class="
							py-3
							px-6
							text-white
							rounded-lg
							bg-blue-400
							shadow-lg
							block
							md:inline-block
							w-28
						"
                        @click="joinBtnOnclick"
                    >
                        JOIN
                    </button>
                </div>
                <div>
                    <button
                        class="
							py-3
							px-6
							text-white
							rounded-lg
							bg-red-400
							shadow-lg
							block
							md:inline-block
							w-28
						"
                        @click="createBtnOnclick"
                    >
                        CREATE
                    </button>
                </div>
            </div>
            <div
                class="
                    justify-center
                    items-center
                    flex
                    py-3
                    px-6
                    text-xl
                    font-bold
                    "
            >
                <label for="rate">{{ this.rate }} score/point</label>
            </div>
        </div>
        <div
            class="
				justify-center
				items-center
				fixed
				flex
				inset-0
				bg-gray-600 bg-opacity-80
				h-full
				w-full
				z-50
			"
            v-if="showDialog"
        >
            <EnterRoom
                style="z-index: 999"
                ref="enterRoom"
                :msg="msg"
                :pin="pin"
                @onHome="handleBtn"
            />

            <button
                class="
					absolute
					z-10
					cursor-default
					w-screen
					h-screen
					bg-opacity-60
				"
                @click="toggleDialog"
            ></button>
        </div>
    </div>
</template>
<script>
import GameStore from '../store/GameStore';
import EnterRoom from '../components/home/EnterRoom.vue';
import AuthUser from '../store/authUser';
import PointRate from '../store/pointRate';
import itemStore from '../store/itemStore';

export default {
    name: 'Home',
    components: { EnterRoom },
    data() {
        return {
            socket: GameStore.getters.getSocket,
            showDialog: false,
            inputPlayerName: '',
            msg: '',
            pin: '',
            rate: '',
        };
    },
    methods: {
        toggleDialog() {
            this.showDialog = !this.showDialog;
        },
        joinBtnOnclick() {
            this.msg = 'JOIN';
            this.toggleDialog();
        },
        createBtnOnclick() {
            this.msg = 'CREATE';
            this.toggleDialog();
            this.socket.emit('genGameCode');
        },
        handleBtn({ event, pin }) {
            if (event === 'JOIN') {
                // redirect to join a room
                this.pin = pin;
                this.$swal('joining a room').then(() => {
                    this.handleJoinGame();
                });
            } else {
                // redirect to create a room
                this.pin = pin;
                this.$swal('creating a room').then(() => {
                    this.handleNewGame();
                });
            }
            this.toggleDialog();
        },

        handleNewGame() {
            this.handleGuestName();
            this.socket.emit('newGame', { roomName: this.pin, playerName: this.playerName });
            this.$router.push('/multi');
        },

        handleJoinGame() {
            this.handleGuestName();
            this.socket.emit('joinGame', { roomName: this.pin, playerName: this.playerName });
            this.$router.push('/multi');
        },

        handleGuestName() {
            if (this.inputPlayerName == '') {
                this.inputPlayerName = 'GUEST';
            }
            GameStore.commit('setGuestName', this.inputPlayerName);
        },

        reset() {
            this.pin = '';
            this.inputPlayerName = '';
            GameStore.commit('setClientNumber', '');
            GameStore.commit('setGameCode', '');
            GameStore.commit('setGameScore', '');
            GameStore.commit('setGuestName', '');
        },

        socketInit() {
            this.socket.once('init', clientNumber => {
                GameStore.commit('setClientNumber', clientNumber);
            });

            this.socket.once('unknownCode', () => {
                this.reset();
                this.$router.push('/');
                this.$swal('Unknown game code', '', 'error');
            });

            this.socket.once('tooManyPlayers', () => {
                this.reset();
                this.$router.push('/');
                this.$swal('This game is already in progress', '', 'error');
            });
        },

        setPlayerName() {
            this.playerName = AuthUser.getters.isAuthen ? AuthUser.getters.user.name : 'GUEST';
        },
        isAuthen() {
            return AuthUser.getters.isAuthen;
        },
        async getLastRate() {
            this.rate = await PointRate.dispatch('getLastRate');
        },

        async getEquiped() {
            if (this.isAuthen()) {
                await itemStore.dispatch('fetchBlockEquipped');
                await itemStore.dispatch('fetchBackEquipped');
            }
        },

        async fetchUser() {
            if (this.isAuthen()) {
                await AuthUser.dispatch('fetchUser');
            }
        },
    },
    async mounted() {
        this.reset();
        this.socket.removeAllListeners();
        await this.fetchUser();
        this.setPlayerName();
        this.socketInit();
        this.getLastRate();
        await this.getEquiped();
    },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

#logo-p1 {
    font-family: 'PT Serif', serif;
}

#logo-p2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    letter-spacing: -2px;
}
</style>
