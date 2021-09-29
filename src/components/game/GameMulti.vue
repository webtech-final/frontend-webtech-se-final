<template>
    <ion-phaser
        class="border-2 border-white"
        v-if="initialize"
        v-bind:game.prop="game"
        v-bind:initialize.prop="initialize"
    />
</template>

<script>
import Phaser from 'phaser';
import TetrisVs from './scenes/TetrisVs.js';
import GameOver from './scenes/GameOver.js';
import Constants from './constants.js';
import GameStore from '../../store/GameStore';

export default {
    data() {
        return {
            socket: GameStore.getters.getSocket,
            initialize: false,
            game: {
                type: Phaser.AUTO,
                backgroundColor: 0x000000,
                width: Constants.GAME_SCENE_WIDTH + Constants.HUD_WIDTH,
                height: Constants.GAME_SCENE_HEIGHT,
                scene: [TetrisVs, GameOver],
            },
        };
    },
    methods: {
        initializeGame() {
            this.initialize = !this.initialize;
        },
    },
    mounted() {
        this.socket.once('startGame', () => {
            this.initializeGame();
        });
    },
};
</script>
