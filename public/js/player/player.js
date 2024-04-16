import CONST from "../data/constants.js"

const ctx = window.ctx

export default class Player {
    constructor(xi, yi, sizei, colori) {
        this.x = xi
        this.y = yi
        this.size = sizei
        this.team = colori

        
        this.dx = CONST.BASE_SPEED_PLAYER
        this.dy = CONST.BASE_SPEED_PLAYER
        
        this.attack_range = CONST.BASE_RADIUS_ATTACK
        this.detection_range = CONST.BASE_RADIUS_DETECTION
        
        this.detection_range_players = []
        this.attack_range_players = []

        this.particles = []
        this.divider = this.size > 10 ? 2 : 1
        const randomData = {
            minX: this.x - this.attack_range,
            minY: this.y - this.attack_range,
            maxX: this.x + this.attack_range,
            maxY: this.y + this.attack_range
        }
        for (let i = 0; i < this.size / this.divider; i++) {
            this.particles.push({
                x: Math.floor(Math.random() * (randomData.maxX - randomData.minX) + randomData.minX),
                y: Math.floor(Math.random() * (randomData.maxY - randomData.minY) + randomData.minY)
            })
        }
    }

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
        }

        // Draw the player's particles
        for (const particle of this.particles) {
            ctx.fillStyle = this.team
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, this.size / this.divider, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    update() {
        // Check if player is dead
        if (this.isDead()) this.kill()

        // Detect other players
        this.checkRanges()

        // Take damage
        this.fight()

        // Move the player towards the closest player
        this.moveTowardsClosestPlayer()

        // Check if the player is inside the canvas
        const [isX, isY] = this.isInsideCanvas()
        if (!isX) this.dx *= -1
        if (!isY) this.dy *= -1

        // Move the player
        this.x += this.dx
        this.y += this.dy

        // Update the particles
        this.updateParticles()
    }

    // Check if the player is inside the canvas
    isInsideCanvas() {
        const { width, height } = window.canvasDims()
        return [this.x - this.size > 0 && this.x + this.size < width, this.y - this.size > 0 && this.y + this.size < height]
    }

    // Check if the player is inside the detection range
    isInsideDetectionRange(x, y, size) {
        return Math.hypot(this.x - x, this.y - y) < this.detection_range + size
    }

    // Check players within any range
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

    // Moves the player to the closest player
    moveTowardsClosestPlayer() {
        if (this.detection_range_players.length > 0) {
            const closest_player = this.detection_range_players.reduce((prev, curr) => (Math.hypot(this.x - prev.x, this.y - prev.y) < Math.hypot(this.x - curr.x, this.y - curr.y) ? prev : curr))
            const angle = Math.atan2(closest_player.y - this.y, closest_player.x - this.x)
            this.dx += Math.cos(angle) * CONST.PLAYER_DRAG_FORCE
            this.dy += Math.sin(angle) * CONST.PLAYER_DRAG_FORCE
        }
    }

    // Take damage
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
            if (window.RANDOM_PATTERN) angle += Math.floor(Math.random() * 2)
            else angle += CONST.PLAYER_ORBIT_SPEED

            // Calculate the new position
            currentParticle.x = centerX + distance * Math.cos(angle)
            currentParticle.y = centerY + distance * Math.sin(angle)

            // Check if the particle is inside the canvas
            if (currentParticle.x < 0 || currentParticle.x > window.canvasDims().width)
                currentParticle.x = Math.min(Math.max(currentParticle.x, 0), window.canvasDims().width)

            if (currentParticle.y < 0 || currentParticle.y > window.canvasDims().height)
                currentParticle.y = Math.min(Math.max(currentParticle.y, 0), window.canvasDims().height)
        }

        this.particles.splice(particleNumber, this.particles.length - particleNumber)
    }

    // Check if the player is dead
    isDead() {
        return this.size <= 1
    }

    // Remove the player from the game
    kill() {
        window.players = window.players.filter((player) => player !== this)
    }
}
