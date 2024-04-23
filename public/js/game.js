/* eslint-disable no-undef */
import { drawBoard, generateBoardData, generatePlayers } from "./board/board.js"
import { drawEndScreen } from "./board/endScreen.js"
import CONST from "./data/constants.js"
import { progressToRadians } from "./utils/functions.js"

/**
 * The main game class
 */
class Game {
    constructor() {
        // Get the canvas and context from the global scope
        this.ctx = window.ctx
        this.$canvas = window.$canvas

        // Initial setup
        this.finished = false
        this.winner = null

        // Set map data such as walls, floors, objectives, and power-ups, etc..
        generateBoardData()

        // Set the obstacles (mainly walls but can be other obstacles as well)
        window.obstacles = window.obstacles.concat(window.board.walls)

        // Retrieve players UI menu
        // window.$player1Menu = document.getElementById("1")
        // window.$player2Menu = document.getElementById("2")
        window.$health1 = document.getElementById("health-value1")
        window.$captured1 = document.getElementById("flags-value1")
        window.$attack1 = document.getElementById("attack-value1")

        window.$health2 = document.getElementById("health-value2")
        window.$captured2 = document.getElementById("flags-value2")
        window.$attack2 = document.getElementById("attack-value2")

        // Generate the players
        window.players = generatePlayers()

        // Main game loop
        this.mainloop()
    }

    /**
     * The main game loop. It updates the game state and draws the game objects on the canvas.
     */
    mainloop() {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height)

        if (this.finished) {
            drawEndScreen()
            return
        }

        this.update() // Update the state  of every object in the game
        this.draw() // Draw the game objects on the canvas
        this.updateGameStatus() // Update the game status
        requestAnimationFrame(() => this.mainloop())
    }

    /**
     * Draw the game objects on the canvas
     */
    draw() {
        // Board graphics
        drawBoard()

        // Players
        window.players.forEach((player) => player.draw())

        // DEBUG
        if (window.DEBUG) this.printDebugInfo()
    }

    updateUI() {
        // Update the player health
        $health1.textContent = window.players[0].stats.health.toFixed(2)
        $health2.textContent = window.players[1].stats.health.toFixed(2)

        // Update the player attack
        $attack1.textContent = window.players[0].stats.attack.toFixed(2)
        $attack2.textContent = window.players[1].stats.attack.toFixed(2)

        // Update the player objectives
        $captured1.textContent = window.board.objectives.filter((obj) => obj.team === CONST.TEAM_1_COLOR).length
        $captured2.textContent = window.board.objectives.filter((obj) => obj.team === CONST.TEAM_2_COLOR).length
    }

    /**
     * Update the game state
     */
    update() {
        this.updateUI()
        // Obstacles
        window.obstacles.forEach((obstacle) => obstacle.update())
        // Power-ups
        window.board.powerUps.forEach((powerUp) => powerUp.update())
        // Players
        window.players.forEach((player) => {
            player.update() // Update the player state
            this.checkObjectives(player) // Check if the player is close to an objective
        })
    }

    /**
     * Update the game status
     */
    updateGameStatus() {
        let winnerObjectives = Math.max(
            ...Object.values(
                window.board.objectives.reduce((acc, item) => {
                    acc[item.team] = (acc[item.team] || 0) + (item.progress >= 100 ? 1 : 0)
                    return acc
                }, {})
            )
        )

        // Check if the game is finished by objectives
        if (winnerObjectives === window.board.objectives.length) {
            this.finished = true
            this.winner = window.board.objectives[0]?.team === CONST.TEAM_1_COLOR ? "Team 1" : "Team 2"
        }

        // Check if the game is finished by players alive
        if (window.players.filter((player) => player.isDead()).length) {
            this.finished = true
            this.winner = window.players[0].isDead() ? "Team 2" : "Team 1"
        }
    }

    /**
     * Resize the canvas to fit the window size
     */
    resizeCanvas() {
        const { x, y } = $canvas.getBoundingClientRect()
        const { width, height } = document.querySelector(".game").getBoundingClientRect()

        $canvas.width = width
        $canvas.height = height
        window.canvasOffset = { x, y }

        // Objectives (update the coordinates of the objectives)
        const newObjectives = [window.calculateObjectivesCoords(), window.canvasDims().center].flat()
        window.board.objectives.map((coords, i) => {
            coords.x = newObjectives[i].x
            coords.y = newObjectives[i].y
        })
    }

    /**
     * Check if a player is close to an objective and update the objective state
     * @param {Player} player The player to check if it is close to an objective
     */
    checkObjectives(player) {
        // Find the closest objective
        let bestDistance = Infinity
        const objective = window.board.objectives.reduce((best, curr) => {
            // Calculate the distance between the player and the objective (from perimeter to perimeter)
            const distance = Math.hypot(player.x - curr.x, player.y - curr.y) - player.size - curr.size
            // Check if the current objective is closer than the best objective from previous iterations
            if (distance < bestDistance) {
                bestDistance = distance
                return curr
            }
            // If the current objective is not closer, keep the best objective from previous iterations
            else return best
        }, window.board.objectives[0])

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

    /**
     * Print debug information on the canvas
     *
     * - Players size and speed
     * - Players detection and attack range
     * - Objectives progress
     * - Mouse position
     * - Number of players
     * - Player center point
     * - Speed vector
     * - Objectives progress and id
     */
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
        })

        // Draw objectives progress
        window.board.objectives.forEach((objective) => {
            // Draw the objectives
            ctx.fillStyle = (objective.team || "#ffffff") + "80"
            ctx.beginPath()
            ctx.arc(objective.x, objective.y, CONST.OBJECTIVE_SIZE, 0, progressToRadians(objective.progress))
            ctx.lineTo(objective.x, objective.y)
            ctx.fill()
            ctx.fillStyle = "#ffffff20"
            ctx.beginPath()
            ctx.arc(objective.x, objective.y, CONST.OBJECTIVE_SIZE, progressToRadians(objective.progress), 0)
            ctx.lineTo(objective.x, objective.y)
            ctx.fill()

            // Type progress
            ctx.fillStyle = "#ffffff"
            ctx.font = "12px Arial"
            ctx.fillText(`Obj: ${objective.id}`, objective.x - CONST.OBJECTIVE_SIZE / 2, objective.y + CONST.OBJECTIVE_SIZE + 10)
            ctx.fillText(`Progress${objective.progress.toFixed(2)}`, objective.x - CONST.OBJECTIVE_SIZE / 2, objective.y + CONST.OBJECTIVE_SIZE + 20)
        })
    }
}

export default Game
