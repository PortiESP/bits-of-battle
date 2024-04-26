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

        this.state = {
            step: 0,
            frame: 0,
        }
    }

    /**
     * Draws the objective zone
     */
    draw() {
        // Retrieve the canvas context
        const ctx = window.ctx

        // Check if the resources are ready and retrieve the image
        if (!window.resources.isReady()) return

        if (window.time() % CONST.INACTIVE_FRAME_RATE > CONST.INACTIVE_FRAME_RATE * 0.8) this.calculateStep()

        // Select the image to be drawn based on the team
        let image
        if (this.team === CONST.TEAM_1_COLOR) image = window.resources.images[CONST.PLAYER_1_FLAG].img
        else if (this.team === CONST.TEAM_2_COLOR) image = window.resources.images[CONST.PLAYER_2_FLAG].img
        else image = window.resources.images[CONST.DEFAULT_FLAG].img

        ctx.drawImage(
            image,
            this.state.step * CONST.CELL_SIZE,
            0,
            CONST.CELL_SIZE,
            CONST.CELL_SIZE, // Source rectangle
            this.x - CONST.CELL_SIZE / CONST.CHARACTER_CELL_RATIO,
            this.y - CONST.CELL_SIZE / CONST.CHARACTER_CELL_RATIO,
            CONST.CELL_SIZE,
            CONST.CELL_SIZE // Destination rectangle (scaled 2x)
        )
    }

    calculateStep() {
        this.state.step += 1
        if (this.state.step >= 4) this.state.step = 0
    }

}
