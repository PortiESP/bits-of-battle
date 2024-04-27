import CONST from "../data/constants";
import PowerUp from "./power_up";


export class Tornado extends PowerUp {
    constructor(row, col) {
        super(row, col)
    }

    draw() {
        const ctx = window.ctx
        const image = window.resources.images.tornado.img

        ctx.drawImage(
            image,
            0,
            0,
            CONST.CELL_SIZE,
            CONST.CELL_SIZE, // Source rectangle
            this.x,
            this.y,
            CONST.CELL_SIZE,
            CONST.CELL_SIZE // Destination rectangle (scaled 2x)
        )
    }

    actionOnCollision(player) {
        if (player.state.ghost) return

        // Other player
        const otherPlayer = window.players.find((p) => p !== player)

        otherPlayer.state.tornado = true
        otherPlayer.state.tornadoUntil = window.time() + 3000
        
        // Play the sound
        window.sound.play("power_up")
        
        // Destroy the power-up
        this.destructor()
    }
}