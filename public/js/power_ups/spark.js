import PowerUp from "./powerUp.js"

export default function createSpark(x, y, width, height, team) {
    window.obstacles.push(new Spark(x, y, width, height, team))
}

class Spark extends PowerUp {
    constructor(x, y, width, height, team) {
        super(x, y, width, height, team)
    }

    // ====================[ Overrides ]====================>
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return
        const image = window.resources.images.axe.img

        // Draw the axe
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        player.data.attack += 1
        this.destructor()
    }
}
