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
            <a class="">TERTIS</a> <a class="text-5xl">.VS</a>
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
				"
                id=""
                type="text"
                autofocus
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
					leading-tighter
					text-gray-400 text-base
					cursor-text
				"
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

export default {
    name: 'Home',
    components: { EnterRoom },
    data() {
        return {
            socket: GameStore.getters.getSocket,
            showDialog: false,
            msg: '',
            pin: '',
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
                alert('joining a room');
                this.handleJoinGame();
            } else {
                // redirect to create a room
                this.pin = pin;
                alert('creating a room');
                this.handleNewGame();
            }
            this.toggleDialog();
        },

        handleNewGame() {
            this.socket.emit('newGame', this.pin);
            this.$router.push('/multi');
        },

        handleJoinGame() {
            this.socket.emit('joinGame', this.pin);
            this.$router.push('/multi');
        },

        reset() {
            this.pin = '';
            GameStore.commit('setGameCode', '');
            GameStore.commit('setClientNumber', '');
        },

        socketInit() {
            this.socket.once('init', clientNumber => {
                GameStore.commit('setClientNumber', clientNumber);
            });

            this.socket.once('unknownCode', () => {
                this.$router.push('/');
                alert('Unknown game code');
                this.reset();
            });

            this.socket.once('tooManyPlayers', () => {
                this.$router.push('/');
                alert('This game is already in progress');
                this.reset();
            });
        },
    },
    mounted() {
        this.socket.removeAllListeners();
        this.socketInit();
    },
    // sockets: {
    //     tooManyPlayers: function() {
    //         this.reset();
    //         alert('This game is already in progress');
    //         this.$router.push('/');
    //     },
    //     unknownCode: function() {
    //         this.reset();
    //         alert('Unknown game code');
    //         this.$router.push('/');
    //     },
    //     gameCode: function(gameCode) {
    //         console.log(gameCode);
    //         this.pin = gameCode;
    //         this.$refs.enterRoom.roomData.pin = gameCode;
    //         GameStore.commit('setGameCode', gameCode);
    //     },
    // 	init: function(clientNumber) {
    // 		GameStore.commit('setClientNumber', clientNumber);
    // 	}
    // },
};
</script>
<style scoped></style>
