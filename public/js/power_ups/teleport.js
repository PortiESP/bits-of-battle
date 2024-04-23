import CONST from "../data/constants.js"
import PowerUp from "./power_up.js"

export class Teleport extends PowerUp {
    constructor(row, col, toRow, toCol) {
        super(row, col)

        this.target = { row: toRow, col: toCol }
    }

    // ====================[ Overrides ]====================>
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return
        const image = window.resources.images.powerUp.img

        // Draw the axe
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        player.x = this.target.col * CONST.CELL_SIZE + CONST.CELL_SIZE / 2
        player.y = this.target.row * CONST.CELL_SIZE + CONST.CELL_SIZE / 2
    }
}
