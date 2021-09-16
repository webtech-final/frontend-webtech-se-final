import Phaser from 'phaser';

const BLOCK_HEIGHT = 30;
const BLOCK_WIDTH = 30;
const GAME_SCENE_HEIGHT = 600;
const GAME_SCENE_WIDTH = 360;
const HUD_WIDTH = 140;
const ABOVE_GAP = 2;

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add
            .text(width * 0.5, height * 0.5, 'Game Over', {
                fontSize: 48,
            })
            .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('tetris');
        });
    }
}
