import CONST from "../data/constants.js"

const ctx = window.ctx

export default class Player {
    constructor(xi, yi, sizei, colori, controls) {
        this.x = xi // The player's x position
        this.y = yi // The player's y position
        this.size = sizei // The player's size
        this.team = colori // The player's team (represented by a color in hex format, including the '#' symbol)

        this.controls = controls // The player's controls

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
        this.particles = []
        this.divider = this.size > 10 ? 2 : 1
    
        for (let i = 0; i < this.size / this.divider; i++) {
            const particle = {
                size: 5,
                position: {
                    x: this.x,
                    y: this.y
                },
                offset: {
                    x: 0,
                    y: 0
                },
                shift: {
                    x: this.x,
                    y: this.y
                },
                speed: CONST.PLAYER_ORBIT_SPEED + Math.random() * CONST.PLAYER_ORBIT_SPEED_VARIATION,
                targetSize: CONST.PARTICLE_TARGET_SIZE,
                fillColor: this.team,
                orbit: CONST.PLAYER_ORBIT_RADIUS / 3 * Math.random()
            };

            this.particles.push(particle);
        }
    }

    /**
     * Draw the player (does not update the player's position)
     */
    draw() {
        // Draw the player's particles
        for (const particle of this.particles) {
            ctx.beginPath();
            ctx.fillStyle = particle.fillColor;
            ctx.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
            ctx.fill();
        }
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

        // Move the player towards the closest player
        this.move()

        // Check if the player is inside the canvas
        this.handleCanvasCollision()

        // Move the player
        this.x += this.dx
        this.y += this.dy

        // Update the particles
        this.updateParticles()
    }

    /**
     * Move the player based on the keyboard input
     */
    move() {
        if (window.keys[this.controls.up]) this.dy -= CONST.BASE_SPEED_PLAYER * CONST.BASE_ACCELERATION_PLAYER;
        if (window.keys[this.controls.left]) this.dx -= CONST.BASE_SPEED_PLAYER * CONST.BASE_ACCELERATION_PLAYER;
        if (window.keys[this.controls.down]) this.dy += CONST.BASE_SPEED_PLAYER * CONST.BASE_ACCELERATION_PLAYER;
        if (window.keys[this.controls.right]) this.dx += CONST.BASE_SPEED_PLAYER * CONST.BASE_ACCELERATION_PLAYER;

        // Decelerate gradually if no keys are pressed
        if (!window.keys[this.controls.up] && this.dy < 0) this.dy += Math.abs(this.dy * CONST.BASE_ACCELERATION_PLAYER);
        if (!window.keys[this.controls.down] && this.dy > 0) this.dy -= Math.abs(this.dy * CONST.BASE_ACCELERATION_PLAYER);
        if (!window.keys[this.controls.left] && this.dx < 0) this.dx += Math.abs(this.dx * CONST.BASE_ACCELERATION_PLAYER);
        if (!window.keys[this.controls.right] && this.dx > 0) this.dx -= Math.abs(this.dx * CONST.BASE_ACCELERATION_PLAYER);

        // Limit speed to base speed
        this.dy = Math.min(Math.max(this.dy, -CONST.BASE_SPEED_PLAYER), CONST.BASE_SPEED_PLAYER);
        this.dx = Math.min(Math.max(this.dx, -CONST.BASE_SPEED_PLAYER), CONST.BASE_SPEED_PLAYER);

        this.x += this.dx;
        this.y += this.dy;
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

        const width = window.canvasDims().width
        const height = window.canvasDims().height

        const particleNumber = this.size / this.divider

        for (let i = 0; i < particleNumber; i++) {
            const currentParticle = this.particles[i]

            if (!currentParticle) continue

            currentParticle.offset.x += currentParticle.speed * 0.7;
            currentParticle.offset.y += currentParticle.speed * 0.7;
            currentParticle.shift.x += (centerX - currentParticle.shift.x) * currentParticle.speed * CONST.PARTICLE_SHIFT;
            currentParticle.shift.y += (centerY - currentParticle.shift.y) * currentParticle.speed * CONST.PARTICLE_SHIFT;
            currentParticle.position.x = currentParticle.shift.x + Math.cos(i + currentParticle.offset.x) * currentParticle.orbit * CONST.PLAYER_ORBIT_SCALE;
            currentParticle.position.y = currentParticle.shift.y + Math.sin(i + currentParticle.offset.y) * currentParticle.orbit * CONST.PLAYER_ORBIT_SCALE;
            currentParticle.position.x = Math.max(Math.min(currentParticle.position.x, width), 0);
            currentParticle.position.y = Math.max(Math.min(currentParticle.position.y, height), 0);
            currentParticle.size += (currentParticle.targetSize - currentParticle.size) * CONST.PARTICLE_BLINK_FREQUENCY;
            
            if (Math.round(currentParticle.size) === Math.round(currentParticle.targetSize)) {
                currentParticle.targetSize = 1 + Math.random() * 10;
            }
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
