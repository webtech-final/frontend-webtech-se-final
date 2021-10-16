import Phaser from 'phaser';
import GameStore from '../../../store/GameStore';
import itemStore from '../../../store/itemStore';
import AuthUser from '../../../store/authUser';
import Constants from '../constants';

const BLOCK_HEIGHT = Constants.BLOCK_HEIGHT * 0.75;
const BLOCK_WIDTH = Constants.BLOCK_WIDTH * 0.75;
const GAME_SCENE_HEIGHT = Constants.GAME_SCENE_HEIGHT * 0.75;
const GAME_SCENE_WIDTH = Constants.GAME_SCENE_WIDTH * 0.75;
const HUD_WIDTH = Constants.HUD_WIDTH;
const ABOVE_GAP = Constants.ABOVE_GAP;

const api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';

const socket = GameStore.getters.getSocket;

export default class Opponent extends Phaser.Scene {
    constructor() {
        super('opponent');
    }

    init() {
        AuthUser.getters.isAuthen &&
        itemStore.getters.block_equipped[0] !== undefined &&
        itemStore.getters.block_equipped[0].name !== 'Default Block'
            ? (this.useTexture = true)
            : (this.useTexture = false);

        (this.pieceColor = {
            1: [0xff0000, 'S'],
            2: [0xf7f700, 'Z'],
            3: [0xff00ff, 'L'],
            4: [0x00ff00, 'J'],
            5: [0x292cff, 'T'],
            6: [0x00ffff, 'O'],
            7: [0xcacaca, 'I'],
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

        this.clientNumber = GameStore.getters.getClientNumber;
    }

    preload() {
        if (this.useTexture) {
            const texturePaths = itemStore.getters.block_equipped[0].item_details;

            this.load.image('S', api_endpoint + '/' + texturePaths[0].image_path);
            this.load.image('Z', api_endpoint + '/' + texturePaths[1].image_path);
            this.load.image('L', api_endpoint + '/' + texturePaths[2].image_path);
            this.load.image('J', api_endpoint + '/' + texturePaths[3].image_path);
            this.load.image('T', api_endpoint + '/' + texturePaths[4].image_path);
            this.load.image('O', api_endpoint + '/' + texturePaths[5].image_path);
            this.load.image('I', api_endpoint + '/' + texturePaths[6].image_path);
        }
    }

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
                                    self.pieceColor[col][0],
                                )
                                .setStrokeStyle(3, 0xffffff),
                        );
                    }
                });
            });
        }

        function drawField(self, field) {
            field.forEach((row, y) => {
                row.forEach((col, x) => {
                    if (col != 0) {
                        let newPiece;
                        if (self.useTexture) {
                            newPiece = self.add
                                .image(
                                    x * BLOCK_WIDTH + BLOCK_WIDTH / 2,
                                    (y - 2) * BLOCK_HEIGHT + BLOCK_HEIGHT / 2,
                                    self.pieceColor[col][1],
                                )
                                .setScale(0.2325);
                        } else {
                            newPiece = self.add
                                .rectangle(
                                    x * BLOCK_WIDTH + BLOCK_WIDTH / 2,
                                    (y - 2) * BLOCK_HEIGHT + BLOCK_HEIGHT / 2,
                                    BLOCK_WIDTH,
                                    BLOCK_HEIGHT,
                                    self.pieceColor[col][0],
                                )
                                .setStrokeStyle(3, 0xffffff);
                        }
                        self.drawedPiece.push(newPiece);
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
