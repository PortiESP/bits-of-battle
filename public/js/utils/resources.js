import CONST from "../data/constants.js"

class Resources {
    constructor() {
        // Images to be loaded in the game
        this.toLoad = {
            background: "assets/test-background.png",
            floor: "assets/test-floor.png",
            powerUp: "assets/test-powerUp.png",
            player1: "assets/test-player1.png",
            player2: "assets/test-player2.png",
            ninja: "assets/character-ninja.png",
            dragon: "assets/character-dragon.png",
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

export const resources = new Resources()
