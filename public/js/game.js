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
        window.players = [new Player(CONST.BASE_PLAYER_SIZE + 10, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR)]
    }

    mainloop() {
        requestAnimationFrame(() => this.mainloop())
        ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        this.update()
        this.draw()
    }

    draw() {
        drawBoard()
        window.players.forEach((player) => player.draw())

        if (window.DEBUG) this.printDebugInfo()
    }

    update() {
        // Update the game state
        window.players.forEach((player) => {
            player.update()
            this.checkObjectives(player)
        })
    }

    resizeCanvas() {
        const { x, y } = $canvas.getBoundingClientRect()

        $canvas.width = window.innerWidth * CONST.CANVAS_WINDOW_RATIO
        $canvas.height = window.innerWidth * CONST.CANVAS_WINDOW_RATIO * CONST.CANVAS_ASPECT_RATIO
        window.canvasOffset = { x, y }

        // Objectives (update the coordinates of the objectives)
        const newObjectives = [window.calculateObjectivesCoords(), window.canvasDims().center].flat()
        window.objectives.map((coords, i) => {
            coords.x = newObjectives[i].x
            coords.y = newObjectives[i].y
        })
    }

    checkObjectives(player) {
        // Check if the player is near an objective
        const objective = window.objectives[player.objective.id]
        const distance = Math.hypot(player.x - objective.x, player.y - objective.y)

        // Check if the player is near the objective
        if (distance < player.size + CONST.OBJECTIVE_SIZE) {
            // Check if the objective is already taken
            if (objective.team === player.team && objective.progress >= 100) return

            // If the objective is not taken, take it, if it is taken, attack it
            if (objective.team === player.team) {
                objective.progress += CONST.OBJECTIVE_PROGRESS_STEP
            } else {
                objective.progress -= CONST.OBJECTIVE_PROGRESS_STEP
                if (objective.progress <= 0 || objective.team === null) {
                    objective.team = player.team
                    objective.progress = -objective.progress
                }
            }
        }
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
            ctx.fillText(`${Math.floor(player.objective.distance)}`, player.objective.x, player.objective.y)
        })

        // Draw objectives progress
        window.objectives.forEach((objective) => {
            ctx.fillStyle = "#ffffff"
            ctx.font = "12px Arial"
            ctx.fillText(`Obj: ${objective.id}`, objective.x - CONST.OBJECTIVE_SIZE / 2, objective.y + CONST.OBJECTIVE_SIZE + 10)
            ctx.fillText(`Progress${objective.progress.toFixed(2)}`, objective.x - CONST.OBJECTIVE_SIZE / 2, objective.y + CONST.OBJECTIVE_SIZE + 20)
        })
    }
}

export default Game
