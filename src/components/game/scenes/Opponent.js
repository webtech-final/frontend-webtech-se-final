import Phaser from 'phaser';
import GameStore from '../../../store/GameStore';
import Constants from '../constants';

const BLOCK_HEIGHT = Constants.BLOCK_HEIGHT;
const BLOCK_WIDTH = Constants.BLOCK_WIDTH;
const GAME_SCENE_HEIGHT = Constants.GAME_SCENE_HEIGHT;
const GAME_SCENE_WIDTH = Constants.GAME_SCENE_WIDTH;
const HUD_WIDTH = Constants.HUD_WIDTH;
const ABOVE_GAP = Constants.ABOVE_GAP;

const socket = GameStore.getters.getSocket;

export default class Opponent extends Phaser.Scene {
    constructor() {
        super('opponent');
    }
    
    init() {
        this.field = (() => {
            let w = parseInt(GAME_SCENE_WIDTH / BLOCK_WIDTH);
            let h = parseInt(GAME_SCENE_HEIGHT / BLOCK_HEIGHT) + ABOVE_GAP;
            const matrix = [];
            while (h--) {
                matrix.push(new Array(w).fill(0));
            }
            return matrix;
        })();

        this.field[1][1] = 1;

        this.clientNumber = GameStore.getters.getClientNumber;
        this.drawField = (field) => {
            field.forEach((row, y) => {
                row.forEach((col, x) => {
                    if (col != 0) {
                        this.add.rectangle(
                            x * BLOCK_WIDTH + BLOCK_HEIGHT / 2,
                            y * BLOCK_HEIGHT + BLOCK_HEIGHT / 2,
                            BLOCK_WIDTH,
                            BLOCK_HEIGHT,
                            0xffffff,
                            );
                        }
                    });
                });
            };
    }

    preload() {}

    create() {
        
        console.log(this)
        this.drawField(this.field);
        console.log("END")
        if (this.clientNumber === 1) {
            const self = this
            socket.on('state2', (data) => {
                console.log('state2 is runed')
                // self.field = data
                self.drawField(data)
            })
        } else if (this.clientNumber === 2) {
            const self = this
            socket.on('state1', (data) => {
                console.log('state1 is runed')
                // self.field = data
                self.drawField(data)
            })
        }
    }

    update() {
    }
}
