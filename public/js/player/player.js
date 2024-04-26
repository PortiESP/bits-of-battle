import CONST from "../data/constants.js"

export default class Player {
    constructor(xi, yi, sizei, colori, controls) {
        this.ctx = window.ctx

        this.x = xi + CONST.CELL_SIZE / 2 // The player's x position
        this.y = yi + CONST.CELL_SIZE / 2 // The player's y position
        this.size = sizei / 2 // The player's size as a radius
        this.team = colori // The player's team (represented by a color in hex format, including the '#' symbol)

        this.controls = controls // The player's controls

        this.state = {
            // The player's state
            moving: false, // The player is moving
            direction: { x: 0, y: 0 }, // The player's direction
            currentSprite: { x: 0, y: 0 }, // The player's current sprite
            step: 0, // The player's step
            frame: 0, // The player's frame
            cooldown: 0, // The player's cooldown (for attacking)
            attacking: false, // The player is attacking
        }

        // Player data
        this.stats = {
            health: CONST.MAX_PLAYER_HEALTH,
            attack: CONST.BASE_PLAYER_ATTACK,
            defense: CONST.BASE_PLAYER_DEFENSE,
            flags: 0,
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
    }

    /**
     * Draw the player (does not update the player's position)
    */
    draw() {
        if (!window.resources.isReady()) return
        const images = window.resources.images

        if (this.state.frame % CONST.FRAME_RATE === 0) {
            this.calculateStep()
        }
        this.state.frame += 1

        // Select the image based on the player's team
        let selection
        if (this.state.attacking) {
            selection = { p1: CONST.PLAYER_1_ATTACK, p2: CONST.PLAYER_2_ATTACK}
            this.state.frame = 0
        } else selection = { p1: CONST.PLAYER_1_CHARACTER, p2: CONST.PLAYER_2_CHARACTER}

        const image = this.team === CONST.TEAM_1_COLOR ? images[selection.p1].img : images[selection.p2].img

        // Draw the sprite
        ctx.drawImage(
            image,
            this.state.currentSprite.x * CONST.CHARACTER_SPRITE_SIZE,
            this.state.currentSprite.y * CONST.CHARACTER_SPRITE_SIZE,
            CONST.CHARACTER_SPRITE_SIZE,
            CONST.CHARACTER_SPRITE_SIZE, // Source rectangle
            this.x - CONST.CELL_SIZE / CONST.CHARACTER_CELL_RATIO,
            this.y - CONST.CELL_SIZE / CONST.CHARACTER_CELL_RATIO,
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

        // Fight other players
        this.fight()

        // Move the player
        this.move()
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
        let newDirection = { x: 0, y: 0 }

        // Update the direction based on the most recent key pressed
        if (window.keys[this.controls.up]) {
            newDirection = { x: 0, y: -1 }
            this.dy = -CONST.BASE_SPEED_PLAYER
        }
        if (window.keys[this.controls.down]) {
            newDirection = { x: 0, y: 1 }
            this.dy = CONST.BASE_SPEED_PLAYER
        }
        if (window.keys[this.controls.left]) {
            newDirection = { x: -1, y: 0 }
            this.dx = -CONST.BASE_SPEED_PLAYER
        }
        if (window.keys[this.controls.right]) {
            newDirection = { x: 1, y: 0 }
            this.dx = CONST.BASE_SPEED_PLAYER
        }
        if (window.keys[this.controls.attack] && this.state.attacking) {
            newDirection = this.state.direction
            this.dx = 0
            this.dy = 0
        }

        // Check if the player is moving diagonally
        if (this.dx !== 0 && this.dy !== 0) {
            this.dx /= Math.sqrt(2)
            this.dy /= Math.sqrt(2)
        }


        // If no keys are pressed, stop the player
        this.state.moving = Object.values(this.controls).filter((value) => {
            if (value === this.controls.attack) return false
            return (window.keys[value] ? true : false)
        }).length

        // Update the direction
        if (this.state.moving) this.state.direction = newDirection

        this.x += this.dx
        this.y += this.dy
    }

    /**
     * Attack the players if the player does not have a cooldown and the attack key is pressed
     * If the player has a cooldown, the cooldown is decreased by 1 until it reaches 0
     * The cooldown is set to CONST.BASE_ATTACK_COOLDOWN after the player attacks
     * @see CONST.BASE_ATTACK_COOLDOWN
     * @see attack
    */
    fight() {
        // Check if the player has a cooldown
        if (this.state.cooldown === CONST.BASE_ATTACK_COOLDOWN - 10) {
            this.state.attacking = false
            this.state.cooldown -= 1
            return
        } else if (this.state.cooldown > 0) {
            this.state.cooldown -= 1
            return
        }

        // Check keys pressed
        if (window.keys[this.controls.attack]) {
            // Set the player to attacking
            this.state.attacking = true
    
            // Check if the player is attacking
            this.state.cooldown = CONST.BASE_ATTACK_COOLDOWN
    
            // Fight the players in the attack range
            this.attack()
        }
    }

    // Calculate the step for the player sprite
    calculateStep() {
        if (!this.state.moving && !this.state.attacking) return
        this.state.step += 1
        if (this.state.step >= 4) this.state.step = 0

        // Calculate the sprite position
        let spriteX = 0
        let spriteY = this.state.step

        if (this.state.attacking) spriteY = 0

        // Calculate the direction
        if (this.state.direction.y === 1) spriteX = 0
        else if (this.state.direction.y === -1) spriteX = 1
        else if (this.state.direction.x === -1) spriteX = 2
        else if (this.state.direction.x === 1) spriteX = 3

        this.state.currentSprite = { x: spriteX, y: spriteY }
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
                auxDetectionRange.push(player)

                // Check if the player is facing the other player
                const angle = Math.atan2(player.y - this.y, player.x - this.x)

                if (Math.abs(angle - Math.atan2(this.state.direction.y, this.state.direction.x)) < CONST.BASE_ANGLE_ATTACK)
                    auxAttackRange.push(player)
            }
            // Check if the player is within the detection range
            else if (distance < this.detection_range + player.size) auxDetectionRange.push(player)
        }

        // Update the ranges in the player's attributes
        this.detection_range_players = auxDetectionRange
        this.attack_range_players = auxAttackRange
    }

    /**
     * Attack the players in the attack range
     * The attack range is calculated in the checkRanges method
     * @see checkRanges
     */
    attack() {
        for (const player of this.attack_range_players) {
            // Calculate the damage
            const damage = this.stats.attack - player.stats.defense

            // Play the sound
            window.sound.play("hit")

            // Deal the damage to the player
            if (player.stats.health - damage < 0) player.stats.health = 0
            else player.stats.health -= damage
        }
    }

    /**
     * Check if the player is dead
     * @returns {boolean} True if the player is dead
     */
    isDead() {
        return this.stats.health <= 0
    }

    /**
     * Remove the player from the game
     */
    kill() {
        // TODO: Implement the kill method
        // WARN: Do not remove the player from the players array, as it will break the game loop, just set the player's health to 0
    }
}
