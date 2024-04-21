import PowerUp from "./powerUp.js"

export default function createSpark(team) {
    window.obstacles.push(new Spark(team))
}

class Spark extends PowerUp {
    constructor(x, y, width, height, team) {
        super(x, y, width, height, team)
        this.width = 20
        this.height = 20
    }

    // ====================[ Overrides ]====================>
    draw() {
        ctx.fillStyle = this.team
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        if (!this.placed) return

        let value = 0
        if (player.team === this.team) value = 2
        else value = -2

        player.size += value
        this.destructor()
    }
}
