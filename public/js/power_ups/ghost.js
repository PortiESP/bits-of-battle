import PowerUp from "./power_up.js"
import CONST from "../data/constants.js"

export class Ghost extends PowerUp {
    constructor(row, col, width = CONST.CELL_SIZE, height = CONST.CELL_SIZE, team = undefined) {
        super(row, col, width, height, team)
    }

    // ====================[ Overrides ]====================>
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return
        const image = window.resources.images.ghost.img

        // Draw the life pot
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        if (player.state.ghost) return


        // Play the heal sound
        window.sound.play("power_up")

        // Gives the player ghost mode
        player.state.ghost = true
        
        // Disables ghost mode after 10 seconds
        setTimeout(() => {
            player.state.ghost = false
        }, CONST.GHOST_DURATION)

        this.destructor()
    }
}
