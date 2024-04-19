import { clamp } from "../utils/collisions.js"

/*
    This is the parent class for all the power ups

    Implement the following methods in the child classes:
    + draw
    + actionOnCollision
    
    Export default "childMethodName" in the child classes to add the power up to the obstacles array

    export default function childMethodName(team) {
        window.obstacles.push(new childClassName(team))
    }
*/

export default class powerUp {
    constructor(color) {
        this.x = window.mouse.x
        this.y = window.mouse.y
        this.placed = false
        this.color = color
        
        // Coordinates (not considered until the power up is placed)
        this.width = undefined
        this.height = undefined

        this.x1 = undefined
        this.y1 = undefined
        this.x2 = undefined
        this.y2 = undefined
    }

    draw() {
        console.error("Draw method not implemented")
        throw new Error("Draw method not implemented")
    }

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

    // Action to perform when the player collides with the power up
    // This function should be implemented in the child classes
    actionOnCollision(player) {
        console.error("actionOnCollision not implemented")
        throw new Error("actionOnCollision not implemented")
    }

    // Destructor to remove the power up from the obstacles array
    destructor() {
        const index = window.obstacles.indexOf(this)
        window.obstacles.splice(index, 1)
    }

    // Get the closest collision point
    getClosestCollisionPoint(x, y) {
        const closestX = clamp(x, this.x1, this.x2)
        const closestY = clamp(y, this.y1, this.y2)

        return { x: closestX, y: closestY }
    }

    // Get the position of the player relative to the power up
    getPosRelative(player) {
        const { x: cpx, y: cpy } = this.getClosestCollisionPoint(player.x, player.y)
        const dx = player.x - cpx
        const dy = player.y - cpy

        return { dx, dy }
    }
}
