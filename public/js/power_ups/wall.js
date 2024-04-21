import PowerUp from "./powerUp.js"

export default function createWall(x, y, width, height, team) {
    window.obstacles.push(new RectWall(x, y, width, height, team))
}

export class RectWall extends PowerUp {
    constructor(x, y, width, height, team) {
        super(x, y, width, height, team)

        // Set the wall's properties
        this.x1 = x
        this.y1 = y
        this.x2 = x + width
        this.y2 = y + height
    }

    // ====================[ Overrides ]====================>
    draw() {
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
