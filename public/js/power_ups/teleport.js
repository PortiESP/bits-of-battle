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
        const image = window.resources.images.teleporter.img

        let sprite_num = undefined
        const ms = Date.now()

        if (ms % 1000 > 666) sprite_num = 2
        else if (ms % 1000 > 333) sprite_num = 1
        else sprite_num = 0

        // Draw the axe
        ctx.drawImage(
            image,
            sprite_num * CONST.CELL_SIZE,
            0,
            CONST.CELL_SIZE,
            CONST.CELL_SIZE, // Source rectangle
            this.x,
            this.y,
            CONST.CELL_SIZE,
            CONST.CELL_SIZE // Destination rectangle (scaled 2x)
        )
    }

    actionOnCollision(player) {
        // Check if the player is close enough to the power up center in order to teleport
        if (this.distanceToCenter(player.x, player.y) > CONST.CELL_SIZE / 5) return

        player.x = this.target.col * CONST.CELL_SIZE + CONST.CELL_SIZE / 2
        player.y = this.target.row * CONST.CELL_SIZE + CONST.CELL_SIZE / 2
    }
}
