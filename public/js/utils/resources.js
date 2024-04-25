import CONST from "../data/constants.js"

export class Resources {
    constructor() {
        // Images to be loaded in the game
        this.toLoad = {
            // The game's background
            wall: "assets/test-wall.png",
            floor: "assets/test-floor.png",
            powerUp: "assets/test-powerUp.png",
            player1: "assets/test-player1.png",
            player2: "assets/test-player2.png",

            // Characters
            blueNinja: "assets/characters/blueNinja/character-blueNinja.png",
            blueNinjaAttack: "assets/characters/blueNinja/attack-blueNinja.png",
            greenNinja: "assets/characters/greenNinja/character-greenNinja.png",
            greenNinjaAttack: "assets/characters/greenNinja/attack-greenNinja.png",
            dragon: "assets/characters/dragon/character-dragon.png",

            // Weapons
            axe: "assets/weapons/weapon-axe.png",
            // Items

            lifePot: "assets/items/item-lifePot.png",
            greenFlag: "assets/items/item-greenFlag.png",
            blueFlag: "assets/items/item-blueFlag.png",
            whiteFlag: "assets/items/item-whiteFlag.png",
            teleporter: "assets/items/item-teleporter.png",
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
