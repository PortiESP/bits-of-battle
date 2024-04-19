import powerUp from "./powerUp.js"

export default function wall(team) {
    window.obstacles.push(new RectWall(team))
}

class RectWall extends powerUp {
    constructor(color) {
        super(color)
        this.width = 20
        this.height = 60
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        // Move the player to the closest point of the
        const { x: cx, y: cy } = this.getClosestCollisionPoint(player.x, player.y)

        // Calculate the angle and distance from the center
        const angle = Math.atan2(player.y - cy, player.x - cx)

        player.x = cx + Math.cos(angle) * (player.size + 0.01)
        player.y = cy + Math.sin(angle) * (player.size + 0.01)

        // Stop the player
        player.dx = 0
        player.dy = 0
    }
}
