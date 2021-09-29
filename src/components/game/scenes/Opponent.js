import Phaser from 'phaser';
import GameStore from '../../../store/GameStore';
import Constants from '../constants';

const BLOCK_HEIGHT = Constants.BLOCK_HEIGHT * 0.75;
const BLOCK_WIDTH = Constants.BLOCK_WIDTH * 0.75;
const GAME_SCENE_HEIGHT = Constants.GAME_SCENE_HEIGHT * 0.75;
const GAME_SCENE_WIDTH = Constants.GAME_SCENE_WIDTH * 0.75;
const HUD_WIDTH = Constants.HUD_WIDTH;
const ABOVE_GAP = Constants.ABOVE_GAP;

const socket = GameStore.getters.getSocket;

export default class Opponent extends Phaser.Scene {
    constructor() {
        super('opponent');
    }

    init() {
        (this.pieceColor = {
            1: 0xff0000,
            2: 0xf7f700,
            3: 0xff00ff,
            4: 0x00ff00,
            5: 0x292cff,
            6: 0x00ffff,
            7: 0xcacaca,
        }),
            (this.field = (() => {
                let w = parseInt(GAME_SCENE_WIDTH / BLOCK_WIDTH);
                let h = parseInt(GAME_SCENE_HEIGHT / BLOCK_HEIGHT) + ABOVE_GAP;
                const matrix = [];
                while (h--) {
                    matrix.push(new Array(w).fill(0));
                }
                return matrix;
            })());

        this.drawedPiece = [];

        this.field[1][1] = 1;

        this.clientNumber = GameStore.getters.getClientNumber;
    }

    preload() {}

    create() {
        var self = this;
        function drawField(self, field) {
            field.forEach((row, y) => {
                row.forEach((col, x) => {
                    if (col != 0) {
                        self.drawedPiece.push(
                            self.add
                                .rectangle(
                                    x * BLOCK_WIDTH + BLOCK_HEIGHT / 2,
                                    (y - 2) * BLOCK_HEIGHT + BLOCK_HEIGHT / 2,
                                    BLOCK_WIDTH,
                                    BLOCK_HEIGHT,
                                    self.pieceColor[col],
                                )
                                .setStrokeStyle(3, 0xffffff),
                        );
                    }
                });
            });
        }

        drawField(self, this.field);
        if (this.clientNumber === 1) {
            socket.on('state2', data => {
                this.drawedPiece.forEach(block => {
                    block.destroy();
                });
                drawField(self, data);
            });
        } else if (this.clientNumber === 2) {
            socket.on('state1', data => {
                this.drawedPiece.forEach(block => {
                    block.destroy();
                });
                drawField(self, data);
            });
        }

        socket.on('gameOver', clientNumber => {
            self.scene.pause();
            socket.removeAllListeners();
        });
    }

    update() {}
}
