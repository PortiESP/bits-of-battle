import { clamp } from "../utils/collisions.js"

export default function wall(team) {
    window.obstacles.push(new RectWall(team))
}

class RectWall {
    constructor(color) {
        console.log("Wall power up activated")
        this.x = window.mouse.x
        this.y = window.mouse.y
        this.placed = false
        this.width = 20
        this.height = 60
        this.color = color

        // Wall coordinates (not considered until the wall is placed)
        this.x1 = undefined
        this.y1 = undefined
        this.x2 = undefined
        this.y2 = undefined
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        // Move the wall if it hasn't been placed
        if (!this.placed) {
            this.x = window.mouse.x
            this.y = window.mouse.y
        }

        // Placing the wall
        if (!this.placed && window.keys.mouse0) {
            this.placed = true
            this.x1 = this.x
            this.y1 = this.y
            this.x2 = this.x + this.width
            this.y2 = this.y + this.height
        }
    }

    // Check if the player is colliding with the wall
    checkCollision(player) {
        if (!this.placed) return

        const { x, y } = player
        const { x1, y1, x2, y2 } = this

        // Get the closest collision point
        const { x: colX, y: colY } = this.getClosestCollisionPoint(x, y)

        // Check if the player is colliding with some point of the wall
        const isColliding = Math.hypot(colX - x, colY - y) < player.size
        const isInside = x > x1 && x < x2 && y > y1 && y < y2

        // Return true if the player is colliding or inside the wall
        if (isColliding || isInside) return true
        return false
    }

    getClosestCollisionPoint(x, y) {
        const closestX = clamp(x, this.x1, this.x2)
        const closestY = clamp(y, this.y1, this.y2)

        return { x: closestX, y: closestY }
    }
}
