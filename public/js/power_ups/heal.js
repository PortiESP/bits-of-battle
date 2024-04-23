import PowerUp from "./power_up.js"
import CONST from "../data/constants.js"

export class Heal extends PowerUp {
    constructor(row, col, width = CONST.CELL_SIZE, height = CONST.CELL_SIZE, team = undefined) {
        super(row, col, width, height, team)
        this.type = "heal"
    }

    // ====================[ Overrides ]====================>
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return
        const image = window.resources.images.lifePot.img

        // Draw the life pot
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        if (player.stats.health === CONST.MAX_PLAYER_HEALTH) return
        player.stats.health += 10
        this.destructor()
    }
}