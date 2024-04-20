import { clamp } from "../utils/collisions.js"

/**
 * This is the parent class for all the power ups.
 *
 * Implement the following methods in the child classes:
 *  - draw
 *  - actionOnCollision
 *
 * See the `docs/project.md` file for more information.
 */
export default class powerUp {
    constructor(color) {
        this.x = window.mouse.x
        this.y = window.mouse.y
        this.width = undefined
        this.height = undefined

        this.placed = false

        this.color = color

        // Coordinates (not considered until the power up is placed)
        this.x1 = undefined
        this.y1 = undefined
        this.x2 = undefined
        this.y2 = undefined
    }

    /**
     * Draw the power up on the canvas
     */
    draw() {
        console.error("Draw method not implemented")
        throw new Error("Draw method not implemented")
    }

    /**
     * Update the power up's position and status
     */
    update() {
        // Move the power up if it hasn't been placed
        if (!this.placed) {
            this.x = window.mouse.x
            this.y = window.mouse.y
        }

        // Placing the power up
        if (!this.placed && window.keys.mouse0) {
            this.placed = true
            this.x1 = this.x
            this.y1 = this.y
            this.x2 = this.x + this.width
            this.y2 = this.y + this.height
        }
    }

    // Check if the player is colliding with the power up
    /**
     * Checks if the player is colliding with the power up
     * @param {Player} player The player to check if it is colliding with the power up
     * @returns {boolean} True if the player is colliding with the power up, false otherwise
     */
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

    /**
     * Action to perform when the player collides with the power up
     *
     * ⚠ This function should be implemented in the child classes
     *
     * @param {Player} player The player that collided with the power up
     */
    actionOnCollision(player) {
        console.error("actionOnCollision not implemented")
        throw new Error("actionOnCollision not implemented")
    }

    /**
     * Destructor to remove the power up from the obstacles array
     */
    destructor() {
        const index = window.obstacles.indexOf(this)
        window.obstacles.splice(index, 1)
    }

    /**
     * Get the closest collision point of the power up to a point (x,y)
     * @param {number} x Coordinate on the x-axis
     * @param {number} y Coordinate on the y-axis
     * @returns {Object} { x, y }
     */
    getClosestCollisionPoint(x, y) {
        const closestX = clamp(x, this.x1, this.x2)
        const closestY = clamp(y, this.y1, this.y2)

        return { x: closestX, y: closestY }
    }

    /**
     * Calculates the relative position from a point (x,y) to the closest collision point of the power up
     * @param {number} x Coordinate on the x-axis
     * @param {number} y Coordinate on the y-axis
     * @returns {Object} { dx, dy }
     */
    getPosRelative(x, y) {
        const { x: cpx, y: cpy } = this.getClosestCollisionPoint(x, y)
        const dx = x - cpx
        const dy = y - cpy

        return { dx, dy }
    }
}
