import CONST from "../data/constants.js"

const ctx = window.ctx

export default class Player {
    constructor(xi, yi, sizei, colori) {
        this.x = xi
        this.y = yi
        this.size = sizei
        this.team = colori

        // Speed
        this.dx = 0 // The player's speed in the x-axis
        this.dy = 0 // The player's speed in the y-axis

        // Ranges
        this.attack_range = CONST.BASE_RADIUS_ATTACK // The player will attack players within this range
        this.detection_range = CONST.BASE_RADIUS_DETECTION // The player will detect players within this range

        // Players in range
        this.detection_range_players = [] // Players in the detection range
        this.attack_range_players = [] // Players in the attack range

        // Path
        this.objective = { x: undefined, y: undefined } // The player will move towards this point
        this.objDistance = 0 // The distance to the objective

        // Create the particles
        this.particles = []
        this.divider = this.size > 10 ? 2 : 1
        const randomData = {
            minX: this.x - this.attack_range,
            minY: this.y - this.attack_range,
            maxX: this.x + this.attack_range,
            maxY: this.y + this.attack_range,
        }
        for (let i = 0; i < this.size / this.divider; i++) {
            this.particles.push({
                x: Math.floor(Math.random() * (randomData.maxX - randomData.minX) + randomData.minX),
                y: Math.floor(Math.random() * (randomData.maxY - randomData.minY) + randomData.minY),
            })
        }
    }

    /**
     * Draw the player (does not update the player's position)
     */
    draw() {
        if (window.DEBUG) {
            // Print the attack, damage and detection range
            ctx.lineWidth = 2
            ctx.strokeStyle = "#00000080"

            // Draw the detection range
            ctx.fillStyle = this.detection_range_players.length > 0 ? "#DADF3180" : "#DADF3110"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.detection_range, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()

            // Draw the attack  range
            ctx.fillStyle = "#C731DF33"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.attack_range, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()

            ctx.fillStyle = this.team
            ctx.strokeStyle = "black"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
        }

        // Draw the player's particles
        for (const particle of this.particles) {
            ctx.fillStyle = this.team
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, this.size / this.divider, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    /**
     * Update the player's position and status
     */
    update() {
        // Check if player is dead
        if (this.isDead()) this.kill()

        // Detect other players
        this.calculateBestObjective()

        // Take damage
        this.fight()

        // Move the player towards the closest player
        this.moveToBestObjective()

        // Check if the player is inside the canvas
        this.handleCanvasCollision()

        // Move the player
        this.x += this.dx
        this.y += this.dy

        // Update the particles
        this.updateParticles()
    }

    /**
     * Move the player towards the best objective
     */
    moveToBestObjective() {
        const angle = Math.atan2(this.objective.y - this.y, this.objective.x - this.x)
        this.objDistance = Math.hypot(this.objective.x - this.x, this.objective.y - this.y)

        if (this.objDistance < CONST.DEBOUNCER_DISTANCE) {
            this.dx = 0
            this.dy = 0
            return
        }
        this.dx = Math.cos(angle) * CONST.BASE_SPEED_PLAYER
        this.dy = Math.sin(angle) * CONST.BASE_SPEED_PLAYER
    }

    /**
     * Calculate best objective
     */
    calculateBestObjective() {
        this.checkRanges()

        this.objective = { x: window.mouse.x, y: window.mouse.y }
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

        for (const player of window.players) {
            if (player === this) continue
            const distance = Math.hypot(this.x - player.x, this.y - player.y)

            if (distance < this.attack_range + player.size) {
                auxAttackRange.push(player)
                auxDetectionRange.push(player)
            } else if (distance < this.detection_range + player.size) auxDetectionRange.push(player)
        }

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
        this.divider = this.size > 10 ? 2 : 1

        const centerX = this.x
        const centerY = this.y

        const particleNumber = this.size / this.divider

        for (let i = 0; i < particleNumber; i++) {
            const currentParticle = this.particles[i]

            if (!currentParticle) continue

            // Calculate the angle and distance from the center
            let angle = Math.atan2(currentParticle.y - centerY, currentParticle.x - centerX)
            const distance = Math.hypot(currentParticle.x - centerX, currentParticle.y - centerY)

            // Increase the angle to move the particle along the orbit
            angle += (CONST.PLAYER_ORBIT_SPEED * Math.PI) / 180 // Rad to degrees

            // Calculate the new position
            currentParticle.x = centerX + distance * Math.cos(angle) + this.dx
            currentParticle.y = centerY + distance * Math.sin(angle) + this.dy

            // Check if the particle is inside the canvas
            if (currentParticle.x < 0 || currentParticle.x > window.canvasDims().width) currentParticle.x = Math.min(Math.max(currentParticle.x, 0), window.canvasDims().width)

            if (currentParticle.y < 0 || currentParticle.y > window.canvasDims().height) currentParticle.y = Math.min(Math.max(currentParticle.y, 0), window.canvasDims().height)
        }

        this.particles.splice(particleNumber, this.particles.length - particleNumber)
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
