import CONST from "../data/constants.js"

const ctx = window.ctx

export default class Player {
    constructor(xi, yi, sizei, colori) {
        this.x = xi
        this.y = yi
        this.size = sizei
        this.team = colori

        this.dx = 1
        this.dy = 1

        this.attack_range = CONST.BASE_RADIUS_ATTACK
        this.damage_range = CONST.BASE_RADIUS_DAMAGE
        this.detection_range = CONST.BASE_RADIUS_DETECTION

        this.players_detected = []
    }

    draw() {
        if (window.DEBUG) {
            // Print the attack, damage and detection range
            ctx.lineWidth = 2
            ctx.strokeStyle = "#00000080"

            // Draw the detection range
            ctx.fillStyle = this.players_detected.length > 0 ? "#DADF3180" : "#DADF3110"
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
        // Check if the player is inside the canvas
        const [isX, isY] = this.isInsideCanvas()
        if (!isX) this.dx *= -1
        if (!isY) this.dy *= -1

        // Move the player
        this.x += this.dx
        this.y += this.dy

        // Detect other players
        this.players_detected = window.players.filter((player) => player !== this && player.isInsideDetectionRange(this.x, this.y, this.size))
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
}
