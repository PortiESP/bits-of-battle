import PowerUp from "./power_up.js"
import CONST from "../data/constants.js"

export class Shield extends PowerUp {
    constructor(row, col, width = CONST.CELL_SIZE, height = CONST.CELL_SIZE, team = undefined) {
        super(row, col, width, height, team)
    }

    // ====================[ Overrides ]====================>
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return
        const image = window.resources.images.milkPot.img

        // Draw the life pot
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }

    actionOnCollision(player) {
        if (player.state.ghost) return


        // Can't be increased if the player is at max defense
        if (player.stats.defense === CONST.MAX_PLAYER_DEFENSE) return

        // Play the power up sound
        window.sound.play("power_up")

        // Increase the player's defense
        player.stats.defense += 2

        // Cap the defense to the max defense
        if (player.stats.defense > CONST.MAX_PLAYER_DEFENSE) player.stats.defense = CONST.MAX_PLAYER_DEFENSE

        // Remove the power up
        this.destructor()
    }
}
