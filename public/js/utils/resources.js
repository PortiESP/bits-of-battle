import CONST from "../data/constants.js"

export class Resources {
    constructor() {
        // Get the name of the files in the assets folder
        const characters = {}
        for (let i = 0; i < CONST.CHARACTERS_NAMES.length; i++) {
            const character = CONST.CHARACTERS_NAMES[i] 
            characters[character + "_attack"] = `assets/characters/${character}/Attack.png`
            characters[character + "_sprite"] = `assets/characters/${character}/SpriteSheet.png`
        }

        // Images to be loaded in the game
        this.toLoad = {
            // The game's background
            wall: "assets/board/board-wall.png",
            floor: "assets/board/board-floor.png",
            player1: "assets/board/board-player1.png",
            player2: "assets/board/board-player2.png",

            // Characters
            ...characters,
            shadow: "assets/characters/Shadow.png",

            // Weapons
            axe: "assets/weapons/weapon-axe.png",

            // Items
            lifePot: "assets/items/item-lifePot.png",
            milkPot: "assets/items/item-milkPot.png",
            greenFlag: "assets/items/item-greenFlag.png",
            blueFlag: "assets/items/item-blueFlag.png",
            whiteFlag: "assets/items/item-whiteFlag.png",
            teleporter: "assets/items/item-teleporter.png",
            ghost: "assets/items/item-ghost.png",
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
        let ready = true
        Object.keys(this.toLoad).forEach((key) => {
            if (!this.images[key]) ready = false
        })

        return ready
    }
}
