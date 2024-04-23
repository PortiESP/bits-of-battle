import CONST from "../data/constants.js"
import PowerUp from "./powerUp.js"

export class RectWall extends PowerUp {
    constructor(row, col) {
        super(row, col, CONST.CELL_SIZE, CONST.CELL_SIZE)
    }

    // ====================[ Overrides ]====================>
    draw() {
        // Draw the wall in the game
        const img = window.resources.images.wall.img
        ctx.drawImage(img, this.x, this.y, CONST.CELL_SIZE, CONST.CELL_SIZE)

        // Draw the wall in debug mode with a red color
        if (!this.team && window.DEBUG) {
            ctx.fillStyle = "#ff000080"
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    actionOnCollision(player) {
        // Move the player to the closest point of the
        const { x: cx, y: cy } = this.getClosestCollisionPoint(player.x, player.y)
        const { dx, dy } = this.getPosRelative(player.x, player.y)

        // Calculate the angle and distance from the center
        const angle = Math.atan2(player.y - cy, player.x - cx)

        if (dx) player.x = cx + Math.cos(angle) * (player.size + 0.01)
        if (dy) player.y = cy + Math.sin(angle) * (player.size + 0.01)
    }
}
