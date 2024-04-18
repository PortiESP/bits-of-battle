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
        window.players = [new Player(CONST.BASE_PLAYER_SIZE + 10, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR, CONST.CONTROLS_P1), new Player($canvas.width - CONST.BASE_PLAYER_SIZE - 10, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_2_COLOR, CONST.CONTROLS_P2)]
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
        // Find the closest objective
        let bestDistance = Infinity
        const objective = window.objectives.reduce((best, curr) => {
            // Calculate the distance between the player and the objective (from perimeter to perimeter)
            const distance = Math.hypot(player.x - curr.x, player.y - curr.y) - player.size - curr.size
            // Check if the current objective is closer than the best objective from previous iterations
            if (distance < bestDistance) {
                bestDistance = distance
                return curr
            }
            // If the current objective is not closer, keep the best objective from previous iterations
            else return best
        }, window.objectives[0])

        const distance = bestDistance

        // Check if the player is inside the objective
        if (distance < 0) {
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
            ctx.lineWidth = 2
            ctx.strokeStyle = "#00000080"

            // Draw the detection range
            ctx.fillStyle = player.detection_range_players.length > 0 ? "#DADF3180" : "#DADF3110"
            ctx.beginPath()
            ctx.arc(player.x, player.y, player.detection_range, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()

            // Draw the attack  range
            ctx.fillStyle = "#C731DF33"
            ctx.beginPath()
            ctx.arc(player.x, player.y, player.attack_range, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()

            // Draw the player center point using the player's team color and radius
            ctx.fillStyle = player.team
            ctx.strokeStyle = "black"
            ctx.beginPath()
            ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = "#ffffff"
            // Draw the player's size and speed
            ctx.fillText(`Size: ${player.size.toFixed(2)}`, player.x - player.size, player.y - player.size - 10)
            ctx.fillText(`Speed: ${Math.hypot(player.dx, player.dy).toFixed(2)}`, player.x - player.size, player.y - player.size - 20)

            // Draw speed vector
            ctx.strokeStyle = "#ffffff40"
            ctx.beginPath()
            ctx.moveTo(player.x, player.y)
            ctx.lineTo(player.x + player.dx * 10, player.y + player.dy * 10)
            ctx.stroke()

            // Draw the distance to the closest objective
            const distance = Math.hypot(player.x - window.objectives[0].x, player.y - window.objectives[0].y) - player.size - window.objectives[0].size
            ctx.fillText(`Dist: ${distance.toFixed(2)}`, player.x - player.size, player.y + player.size + 10)
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
