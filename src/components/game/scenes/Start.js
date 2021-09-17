import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('ready');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add
            .text(width * 0.5, height * 0.5, 'Are you ready', {
                fontSize: 48,
            })
            .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('tetris');
        });
    }
}
