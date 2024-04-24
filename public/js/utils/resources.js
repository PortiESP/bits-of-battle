import CONST from "../data/constants.js"

export class Resources {
    constructor() {
        // Images to be loaded in the game
        this.toLoad = {
            // The game's background
            wall: "assets/test-wall.png",
            floor: "assets/test-floor.png",
            powerUp: "assets/test-powerUp.png",
            objective: "assets/test-objective.png",
            player1: "assets/test-player1.png",
            player2: "assets/test-player2.png",

            // Characters
            blueNinja: "assets/characters/blueNinja/character-blueNinja.png",
            blueNinjaAttack: "assets/characters/blueNinja/attack-blueNinja.png",
            dragon: "assets/characters/dragon/character-dragon.png",

            // Items
            axe: "assets/weapon-axe.png",
            lifePot: "assets/item-lifePot.png",
            greenFlag: "assets/item-greenFlag.png",
            blueFlag: "assets/item-blueFlag.png",
            whiteFlag: "assets/item-whiteFlag.png",
        }

        this.images = {}

        Object.keys(this.toLoad).forEach((key) => {
            const img = new Image()
            img.src = this.toLoad[key]

            img.onload = () => {
                createImageBitmap(img, { colorSpaceConversion: "none", resizeQuality: "pixelated" }).then((bitmap) => {
                    this.images[key] = {
                        key: key,
                        img: bitmap,
                        loaded: true,
                        src: this.toLoad[key],
                        width: CONST.CHARACTER_SPRITE_SIZE,
                    }
                })
            }
        })
    }

    /**
     * Check if all images are loaded
     */
    isReady() {
        return Object.values(this.images).every((value) => value.loaded) && Object.keys(this.toLoad).length === Object.keys(this.images).length
    }
}
