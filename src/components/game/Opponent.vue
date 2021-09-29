<template>
    <ion-phaser
        class="border-2 border-white"
        v-if="initialize"
        v-bind:game.prop="game"
        v-bind:initialize.prop="initialize"
    />
</template>

<script>
import Phaser, { Game } from 'phaser';
import GameStore from '../../store/GameStore';
import Constants from './constants.js';
import Opponent from './scenes/Opponent.js';

export default {
    data() {
        return {
            socket: GameStore.getters.getSocket,
            initialize: false,
            game: {
                type: Phaser.AUTO,
                backgroundColor: 0x000000,
                width: Constants.GAME_SCENE_WIDTH * 0.75,
                height: Constants.GAME_SCENE_HEIGHT * 0.75,
                scene: [Opponent],
            },
        };
    },
    methods: {
        initializeGame() {
            this.initialize = true;
        },
    },
    mounted() {
        this.socket.once('startGame', () => {
            this.initializeGame();
        });
    },
};
</script>
