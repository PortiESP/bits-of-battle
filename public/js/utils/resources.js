
class Resources {
    constructor() {
        // Images to be loaded in the game
        this.toLoad = {
            background: "assets/test-background.png",
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
}

export const resources = new Resources()