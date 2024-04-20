
class Resources {
    constructor() {
        // Images to be loaded in the game
        this.toLoad = {
            background: "assets/test-background.png",
            floor: "assets/test-floor.png",
            powerUp: "assets/test-powerUp.png",
        }

        this.images = {}

        Object.keys(this.toLoad).forEach((key) => {
            const img = new Image()
            img.src = this.toLoad[key]

            this.images[key] = {
                img: img,
                loaded: false
            }

            img.onload = () => {
                this.images[key].loaded = true
            }
        })
    }

    /**
     * Check if all images are loaded
     */
    isReady() {
        return Object.keys(this.images).every((key) => this.images[key].loaded)
    }
}

export const resources = new Resources()