import { drawBoard } from "./board/board.js"
import CONST from "./data/constants.js"

class Game {
    constructor($canvas) {
        this.ctx = $canvas.getContext("2d")
        this.$canvas = $canvas

        // Resize canvas
        this.resizeCanvas()

        drawBoard()
    }

    resizeCanvas() {
        this.$canvas.width = window.innerWidth * CONST.CANVAS_WINDOW_RATIO
        this.$canvas.height = window.innerWidth * CONST.CANVAS_WINDOW_RATIO * CONST.CANVAS_ASPECT_RATIO

        drawBoard()
    }
}

export default Game
