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
        this.damage_range = CONST.BASE_RADIUS_DAMAGE
        this.detection_range = CONST.BASE_RADIUS_DETECTION

        this.detection_range_players = []
        this.attack_range_players = []
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

            // Draw the attack and damage range
            ctx.fill()
            ctx.fillStyle = "#C731DF33"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.attack_range, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()

            // Draw the damage range
            ctx.fillStyle = "#DF313380"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.damage_range, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()
        }

        ctx.fillStyle = this.team
        ctx.strokeStyle = "black"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
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

            const randomDamageMultiplier = () => CONST.PLAYER_DAMAGE_FORCE * Math.floor(CONST.PLAYER_DAMAGE_CHANCE + Math.random())
            const damageTaken = Math.max(0, s2) * randomDamageMultiplier()
            this.size -= damageTaken
            const damage = Math.max(0, s1) * randomDamageMultiplier()
            player.size -= damage
        }
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
