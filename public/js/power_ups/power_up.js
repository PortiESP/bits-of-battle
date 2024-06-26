import CONST from "../data/constants.js"
import { clamp } from "../utils/functions.js"

/**
 * This is the parent class for all the power ups.
 *
 * Implement the following methods in the child classes:
 *  - draw
 *  - actionOnCollision
 *
 * See the `docs/project.md` file for more information.
 */
export default class PowerUp {
    constructor(row, col, width = CONST.CELL_SIZE, height = CONST.CELL_SIZE, team = undefined) {
        this.row = row
        this.col = col

        // Set the coordinates of the power up
        this.x = col * CONST.CELL_SIZE
        this.y = row * CONST.CELL_SIZE
        this.width = width
        this.height = height

        this.team = team

        // Coordinates of the power up
        this.x1 = this.x
        this.y1 = this.y
        this.x2 = this.x + width
        this.y2 = this.y + height
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
        for (const player of window.players) {
            if (this.checkCollision(player)) {
                this.actionOnCollision(player)
            }
        }
    }

    // Check if the player is colliding with the power up
    /**
     * Checks if the player is colliding with the power up
     * @param {Player} player The player to check if it is colliding with the power up
     * @returns {boolean} True if the player is colliding with the power up, false otherwise
     */
    checkCollision(player) {
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
        console.error("Action on collision method not implemented")
        throw new Error("Action on collision method not implemented")
    }

    /**
     * Destructor to remove the power up from the obstacles array
     */
    destructor() {
        const index = window.board.powerUps.indexOf(this)
        window.board.powerUps.splice(index, 1)
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

    distanceToCenter(x, y) {
        const centerX = this.x + this.width / 2
        const centerY = this.y + this.height / 2

        return Math.hypot(centerX - x, centerY - y)
    }
}
