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

        // Set Game attributes
        this.finished = false

        // DEBUG
        const { center } = window.canvasDims()
        window.players = [new Player(center.x, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR)]
    }

    mainloop() {
        requestAnimationFrame(() => this.mainloop())
        ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        this.draw()
        this.update()
    }

    draw() {
        drawBoard()
        window.players.forEach((player) => {
            player.update()
            player.draw()
        })

        if (window.DEBUG) this.printDebugInfo()
    }

    update() {
        // Update the game state
        const teamAlive = window.players[0]
        this.finished = window.players.every((player) => player.team === teamAlive.team)
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
            ctx.fillText(`Size: ${player.size.toFixed(2)}`, player.x - player.size, player.y - player.size - 10)
            ctx.fillText(`Speed: ${Math.hypot(player.dx, player.dy).toFixed(2)}`, player.x - player.size, player.y - player.size - 20)

            // Draw line to objective
            ctx.beginPath()
            ctx.moveTo(player.x, player.y)
            ctx.lineTo(player.objective.x, player.objective.y)
            ctx.strokeStyle = "#ffffff40"
            ctx.stroke()
            // Draw distance to objective
            ctx.fillStyle = "#ffffff"
            ctx.font = "12px Arial"
            ctx.fillText(`${Math.floor(player.objDistance)}`, player.objective.x, player.objective.y)
        })
    }
}

export default Game
