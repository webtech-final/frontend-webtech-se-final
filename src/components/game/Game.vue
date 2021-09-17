<template>
    <ion-phaser v-bind:game.prop="game" v-bind:initialize.prop="initialize" />
</template>

<script>
import Phaser from 'phaser';
import Tetris from './scenes/Tetris.js';
import GameOver from './scenes/GameOver.js';
import Constants from './constants.js';

export default {
    data() {
        return {
            initialize: false,
            game: {
                type: Phaser.AUTO,
                backgroundColor: 0x000000,
                width: Constants.GAME_SCENE_WIDTH + Constants.HUD_WIDTH,
                height: Constants.GAME_SCENE_HEIGHT,
                scene: [Tetris, GameOver],
            },
        };
    },
    methods: {
        initializeGame() {
            this.initialize = true;
        },
    },
    created() {
        this.initializeGame();
    },
};
</script>
