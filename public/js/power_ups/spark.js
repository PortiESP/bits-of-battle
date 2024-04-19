import { clamp } from "../utils/collisions.js"

export default function spark(team) {
    window.obstacles.push(new Spark(team))
}

class Spark {
    constructor(color) {
        console.log("Spark power up activated")
        this.x = window.mouse.x
        this.y = window.mouse.y
        this.placed = false
        this.width = 25
        this.height = 25
        this.color = color

        // Coordinates (not considered until the spark is placed)
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
        // Move the spark if it hasn't been placed
        if (!this.placed) {
            this.x = window.mouse.x
            this.y = window.mouse.y
        }

        // Placing the spark
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

    actionOnCollision(player) {
        if (!this.placed) return

        let value = 0
        if (player.team === this.color) value = 2
        else value = -2

        player.size += value
        this.destructor()
    }

    destructor() {
        const index = window.obstacles.indexOf(this)
        window.obstacles.splice(index, 1)
    }

    getClosestCollisionPoint(x, y) {
        const closestX = clamp(x, this.x1, this.x2)
        const closestY = clamp(y, this.y1, this.y2)

        return { x: closestX, y: closestY }
    }

    getPosRelative(player) {
        const { x: cpx, y: cpy } = this.getClosestCollisionPoint(player.x, player.y)
        const dx = player.x - cpx
        const dy = player.y - cpy

        return { dx, dy }
    }
}
