import { drawBoard } from "./board.js"

class Game {
    constructor($canvas) {
        this.ctx = $canvas.getContext("2d")
        this.$canvas = $canvas

        // Resize canvas
        this.resizeCanvas()

        drawBoard()
    }

    start() {
        // TODO: Implement this method
        console.log("Game Started")
    }

    pause() {
        // TODO: Implement this method
        console.log("Game Paused")
    }

    reset() {
        // TODO: Implement this method
        console.log("Game Reset")
    }

    resizeCanvas() {
        this.$canvas.width = window.innerWidth * 0.75
        this.$canvas.heigth = window.innerHeight * 0.75
    }
}

export default Game
