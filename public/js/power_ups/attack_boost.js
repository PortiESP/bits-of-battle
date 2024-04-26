import PowerUp from "./power_up.js"

export class AttackBoost extends PowerUp {
    constructor(row, col, boost) {
        super(row, col)

        this.boost = boost
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
        // Play the boost sound
        window.sound.play("power_up")
        
        // Boost the player's attack
        player.stats.attack += this.boost
        this.destructor()
    }
}
