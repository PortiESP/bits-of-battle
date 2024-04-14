import { drawBoard } from "./board/board.js"
import CONST from "./data/constants.js"
import Player from "./player/player.js"

const ctx = window.ctx
const $canvas = window.$canvas

class Game {
    constructor() {
        // Resize canvas
        this.resizeCanvas()
        this.mainloop()

        // DEBUG
        const { width, center } = window.canvasDims()
        window.players = [new Player(140, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR), new Player(width - 140, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_2_COLOR)]
    }

    mainloop() {
        requestAnimationFrame(() => this.mainloop())
        ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        this.draw()
    }

    draw() {
        drawBoard()
        window.players.forEach((player) => {
            player.update()
            player.draw()
        })

        if (window.DEBUG) this.printDebugInfo()
    }

    resizeCanvas() {
        $canvas.width = window.innerWidth * CONST.CANVAS_WINDOW_RATIO
        $canvas.height = window.innerWidth * CONST.CANVAS_WINDOW_RATIO * CONST.CANVAS_ASPECT_RATIO
        const { x, y } = $canvas.getBoundingClientRect()
        window.canvasOffset = { x, y }
    }

    printDebugInfo() {
        ctx.fillStyle = "#eee"
        ctx.font = "12px Arial"
        ctx.fillText(`Players: ${window.players.length}`, 10, 12)

        // Add a tooltip of of the cursor possition
        ctx.fillText(`X: ${window.mouse?.x} Y: ${window.mouse?.y}`, 10, 28)

        // Add players size at the player position
        window.players.forEach((player) => {
            ctx.fillText(`Size: ${player.size}`, player.x - player.size, player.y - player.size - 10)
        })
    }
}

export default Game
