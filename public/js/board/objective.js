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
}
