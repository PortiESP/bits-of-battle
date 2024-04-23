import CONST from "../data/constants"

export default class Objective {
    constructor(id, row, col) {
        this.id = id
        this.col = col
        this.row = row

        this.x = this.col * CONST.CELL_SIZE + CONST.CELL_SIZE / 2
        this.y = this.row * CONST.CELL_SIZE + CONST.CELL_SIZE / 2
        this.progress = 0
        this.team = null
        this.size = CONST.OBJECTIVE_SIZE

        this.drawX = this.col * CONST.CELL_SIZE
        this.drawY = this.row * CONST.CELL_SIZE
    }

    /**
     * Draws the objective zone
     */
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return

        // Select the image to be drawn based on the team
        // let image
        // if (this.team === CONST.TEAM_1_COLOR) image = window.resources.images[CONST.PLAYER_1_FLAG].img
        // else if (this.team === CONST.TEAM_2_COLOR) image = window.resources.images[CONST.PLAYER_2_FLAG].img
        // else image = window.resources.images[CONST.DEFAULT_FLAG].img
        const image = window.resources.images.blueFlag.img

        // Draw the objective zone
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }
}
