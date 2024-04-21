import CONST from "../data/constants.js"
import { clamp } from "../utils/functions.js"
import { resources } from "../utils/resources.js"
import { mapData } from "../board/map.js"
import Particle from "./particle.js"

export default class Player {
    constructor(xi, yi, sizei, colori, controls) {
        this.ctx = window.ctx

        this.x = xi // The player's x position
        this.y = yi // The player's y position
        this.size = sizei // The player's size
        this.team = colori // The player's team (represented by a color in hex format, including the '#' symbol)

        this.controls = controls // The player's controls
        this.pressedKeysStack = [] // The last key pressed by the player

        this.state = {
            // The player's state
            moving: false, // The player is moving
            direction: { x: 0, y: 0 }, // The player's direction
            currentSprite: { x: 0, y: 0 }, // The player's current sprite
            step: 0, // The player's step
            frame: 0, // The player's frame
        }

        // Speed
        this.dx = 0 // The player's speed in the x-axis
        this.dy = 0 // The player's speed in the y-axis

        // Ranges
        this.attack_range = CONST.BASE_RADIUS_ATTACK // The player will attack players within this range
        this.detection_range = CONST.BASE_RADIUS_DETECTION // The player will detect players within this range

        // Players in range
        this.detection_range_players = [] // Players in the detection range
        this.attack_range_players = [] // Players in the attack range

        // Create the particles
        this.particles = Array.from({ length: this.size }, (_, i) => new Particle(i, this.x, this.y, CONST.PARTICLE_TARGET_SIZE, this.team))
    }

    /**
     * Draw the player (does not update the player's position)
     */
    draw() {
        if (!resources.isReady()) return
        const images = resources.images

        if (this.state.frame % CONST.FRAME_RATE === 0 || this.state.step === -1) {
            this.calculateStep()
        }
        this.state.frame += 1

        // Select the image based on the player's team
        const image = this.team === CONST.TEAM_1_COLOR ? images[CONST.PLAYER_1_CHARACTER].img : images[CONST.PLAYER_2_CHARACTER].img

        // Draw the sprite
        ctx.drawImage(
            image,
            this.state.currentSprite.x * CONST.CHARACTER_SPRITE_SIZE,
            this.state.currentSprite.y * CONST.CHARACTER_SPRITE_SIZE,
            CONST.CHARACTER_SPRITE_SIZE,
            CONST.CHARACTER_SPRITE_SIZE, // Source rectangle
            this.x - mapData.pixelSize / CONST.CHARACTER_CELL_RATIO,
            this.y - mapData.pixelSize / CONST.CHARACTER_CELL_RATIO,
            CONST.CHARACTER_SPRITE_SIZE / 2,
            CONST.CHARACTER_SPRITE_SIZE / 2 // Destination rectangle (scaled 2x)
        )
    }

    /**
     * Update the player's position and status
     */
    update() {
        // Check if player is dead
        if (this.isDead()) this.kill()

        // Detect other players
        this.checkRanges()

        // Take damage
        this.fight()

        // Move the player
        this.move()

        // Update the particles
        this.updateParticles()
    }

    /**
     * Move the player based on the keyboard input
     */
    move() {
        // Reset the speed
        this.dx = 0
        this.dy = 0

        // Check if the player is moving
        this.state.moving = true
        const currentDirection = this.state.direction
        let newDirection = { x: 0, y: 0 }

        // Handle the key press
        this.handleKeyPress()

        // Update the direction based on the keys pressed
        //  The most recent key pressed has priority
        const keysPressed = this.pressedKeysStack.length // Number of keys pressed
        if (keysPressed) {
            // Get the most recent key pressed from the stack
            const mostRecentKeyPressed = this.pressedKeysStack[keysPressed - 1]

            // Update the direction based on the most recent key pressed
            if (mostRecentKeyPressed === this.controls.up) {
                newDirection = { x: 0, y: -1 }
                if (currentDirection !== newDirection) this.dy = -CONST.BASE_SPEED_PLAYER
            } else if (mostRecentKeyPressed === this.controls.down) {
                newDirection = { x: 0, y: 1 }
                if (currentDirection !== newDirection) this.dy = CONST.BASE_SPEED_PLAYER
            } else if (mostRecentKeyPressed === this.controls.left) {
                newDirection = { x: -1, y: 0 }
                if (currentDirection !== newDirection) this.dx = -CONST.BASE_SPEED_PLAYER
            } else if (mostRecentKeyPressed === this.controls.right) {
                newDirection = { x: 1, y: 0 }
                if (currentDirection !== newDirection) this.dx = CONST.BASE_SPEED_PLAYER
            }
        }
        // If no keys are pressed, stop the player
        else this.state.moving = false

        // Update the direction
        if (this.state.moving) this.state.direction = newDirection

        // Decelerate gradually if no keys are pressed
        if (!window.keys[this.controls.up] && this.dy < 0) this.dy += Math.abs(this.dy * CONST.BASE_ACCELERATION_PLAYER * CONST.BASE_BRAKE_PLAYER)
        if (!window.keys[this.controls.down] && this.dy > 0) this.dy -= Math.abs(this.dy * CONST.BASE_ACCELERATION_PLAYER * CONST.BASE_BRAKE_PLAYER)
        if (!window.keys[this.controls.left] && this.dx < 0) this.dx += Math.abs(this.dx * CONST.BASE_ACCELERATION_PLAYER * CONST.BASE_BRAKE_PLAYER)
        if (!window.keys[this.controls.right] && this.dx > 0) this.dx -= Math.abs(this.dx * CONST.BASE_ACCELERATION_PLAYER * CONST.BASE_BRAKE_PLAYER)

        // Check if the player is inside the canvas
        this.handleCanvasCollision()
        this.handleObstacleCollision()

        // Limit speed to base speed
        this.dx = clamp(this.dx, -CONST.BASE_SPEED_PLAYER, CONST.BASE_SPEED_PLAYER)
        this.dy = clamp(this.dy, -CONST.BASE_SPEED_PLAYER, CONST.BASE_SPEED_PLAYER)
        // Threshold to stop the player (prevent the player from moving indefinitely when the speed is too low, but not zero)
        if (Math.abs(this.dx) < 0.1) this.dx = 0
        if (Math.abs(this.dy) < 0.1) this.dy = 0

        this.x += this.dx
        this.y += this.dy
    }

    /**
     * Updates the pressed keys stack based on the keyboard input.
     * Newly pressed keys are added to the stack, while keys that are no longer pressed are removed from the stack
     */
    handleKeyPress() {
        // Update the most recent key pressed
        for (let key in this.controls) {
            const keyState = window.keys[this.controls[key]]
            // Update the most recent key pressed
            if (keyState && !this.pressedKeysStack.includes(this.controls[key])) {
                this.pressedKeysStack.push(this.controls[key])
            }
            // Remove the key from the stack if it is not pressed anymore
            else if (!keyState && this.pressedKeysStack.includes(this.controls[key])) {
                this.pressedKeysStack = this.pressedKeysStack.filter((k) => k !== this.controls[key])
            }
        }
    }

    // Calculate the step
    calculateStep() {
        if (!this.state.moving) return
        this.state.step += 1
        if (this.state.step >= 4) this.state.step = 0

        // Calculate the sprite position
        let spriteX = 0
        let spriteY = this.state.step

        // Calculate the direction
        if (this.state.direction.y === 1) spriteX = 0
        else if (this.state.direction.y === -1) spriteX = 1
        else if (this.state.direction.x === -1) spriteX = 2
        else if (this.state.direction.x === 1) spriteX = 3

        this.state.currentSprite = { x: spriteX, y: spriteY }
    }

    /*
     * Check if the player is inside the canvas
     */
    isInsideCanvas() {
        const { width, height } = window.canvasDims()
        return [this.x - this.size > 0 && this.x + this.size < width, this.y - this.size > 0 && this.y + this.size < height]
    }

    /**
     * Check the players within the detection and attack ranges
     */
    checkRanges() {
        const auxDetectionRange = []
        const auxAttackRange = []

        // Loop through all the players to check the detection and attack ranges
        for (const player of window.players) {
            // Skip the player itself
            if (player === this) continue
            // Calculate the distance between the players
            const distance = Math.hypot(this.x - player.x, this.y - player.y)

            // Check if the player is within the attack range
            if (distance < this.attack_range + player.size) {
                auxAttackRange.push(player)
                auxDetectionRange.push(player)
            }
            // Check if the player is within the detection range
            else if (distance < this.detection_range + player.size) auxDetectionRange.push(player)
        }

        // Update the ranges in the player's attributes
        this.detection_range_players = auxDetectionRange
        this.attack_range_players = auxAttackRange
    }

    /**
     * Handle the player's collision with the canvas. Prevents the player from going outside the canvas and getting stuck on the edges
     */
    handleCanvasCollision() {
        const threshold = 0.1 // To avoid the player getting stuck on the edge of the canvas
        const { width, height } = window.canvasDims()
        const [isX, isY] = this.isInsideCanvas()

        // Check if the player is inside the canvas
        if (!isX) {
            this.dx = 0 // Stop the player
            // Bring the player back inside the canvas
            if (this.x - this.size < 0) this.x = this.size + threshold
            else this.x = width - this.size - threshold
        }
        if (!isY) {
            this.dy = 0 // Stop the player
            // Bring the player back inside the canvas
            if (this.y - this.size < 0) this.y = this.size + threshold
            else this.y = height - this.size - threshold
        }
    }

    /**
     * Handle the player's collision with the obstacles
     */
    handleObstacleCollision() {
        for (const obstacle of window.obstacles) {
            if (obstacle.checkCollision(this)) {
                obstacle.actionOnCollision(this)
            }
        }
    }

    /**
     * Reduce the player's size when fighting
     */
    fight() {
        for (const player of this.attack_range_players) {
            // Calculate the damage
            const s1 = this.size
            const s2 = player.size

            const randomDamageMultiplier = () => CONST.PLAYER_ATTACK_MULTIPLIER * Math.floor(CONST.PLAYER_ATTACK_CHANCE + Math.random())
            const damageTaken = Math.max(0, s2) * randomDamageMultiplier()
            this.size -= damageTaken
            const damage = Math.max(0, s1) * randomDamageMultiplier()
            player.size -= damage
        }
    }

    /**
     * Update the player's particles
     */
    updateParticles() {
        // Update the number of particles based on the player's size

        // Constants
        const centerX = this.x
        const centerY = this.y
        const width = window.canvasDims().width
        const height = window.canvasDims().height

        // Update each particle
        for (let prt of this.particles) {
            prt.update(centerX, centerY, width, height)
        }

        if (this.size > this.particles.length) {
            const newParticles = Array.from({ length: this.size - this.particles.length }, (_, i) => new Particle(i, this.x, this.y, CONST.PARTICLE_TARGET_SIZE, this.team))
            this.particles = this.particles.concat(newParticles)
        } else if (this.size < this.particles.length) {
            this.particles = this.particles.slice(0, this.size)
        }
    }

    /**
     * Check if the player is dead
     * @returns {boolean} True if the player is dead
     */
    isDead() {
        return this.size <= 1
    }

    /**
     * Remove the player from the game
     */
    kill() {
        window.players = window.players.filter((player) => player !== this)
    }
}
