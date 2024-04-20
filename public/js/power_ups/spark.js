import powerUp from "./powerUp.js"

export default function spark(team) {
    window.obstacles.push(new Spark(team))
}

class Spark extends powerUp {
    constructor(color) {
        super(color)
        this.width = 20
        this.height = 20
    }

    // ====================[ Overrides ]====================>
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        if (!this.placed) return

        let value = 0
        if (player.team === this.color) value = 2
        else value = -2

        player.size += value
        this.destructor()
    }
}
