import CONST from "../data/constants.js"

export class Resources {
    constructor() {
        // Images to be loaded in the game
        this.toLoad = {
            // The game's background
            wall: "assets/board/board-wall.png",
            floor: "assets/board/board-floor.png",
            player1: "assets/board/board-player1.png",
            player2: "assets/board/board-player2.png",

            // Characters
            blueNinja: "assets/characters/blueNinja/character-blueNinja.png",
            blueNinjaAttack: "assets/characters/blueNinja/attack-blueNinja.png",
            greenNinja: "assets/characters/greenNinja/character-greenNinja.png",
            greenNinjaAttack: "assets/characters/greenNinja/attack-greenNinja.png",
            flame: "assets/characters/flame/character-flame.png",
            flameAttack: "assets/characters/flame/attack-flame.png",
            ninjaYellow: "assets/characters/ninjaYellow/character-ninjaYellow.png",
            ninjaYellowAttack: "assets/characters/ninjaYellow/attack-ninjaYellow.png",
            noble: "assets/characters/noble/character-noble.png",
            nobleAttack: "assets/characters/noble/attack-noble.png",
            spirit: "assets/characters/spirit/character-spirit.png",
            spiritAttack: "assets/characters/spirit/attack-spirit.png",
            dragon: "assets/characters/dragon/character-dragon.png",

            // Weapons
            axe: "assets/weapons/weapon-axe.png",

            // Items
            lifePot: "assets/items/item-lifePot.png",
            milkPot: "assets/items/item-milkPot.png",
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
