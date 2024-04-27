/* eslint-disable no-undef */
import { drawBoard, generateBoardData, generatePlayers } from "./board/board.js"
import CONST from "./data/constants.js"
import { progressToRadians } from "./utils/functions.js"
import { retrievePlayersUIElements, updateUI } from "./utils/ui.js"


/**
 * The main game class
 */
class Game {
    constructor() {
        // Get the canvas and context from the global scope
        this.ctx = window.ctx
        this.$canvas = window.$canvas

        // Initialize the game timer
        this.initialTimer = 0
        this.resumeTimer = Date.now()

        // Initial setup
        this.finished = false
        this.winner = null
        
        // Retrive players UI menu elements
        retrievePlayersUIElements()
        
        if (window.saved) {
            // Set map data such as walls, floors, objectives, and power-ups, etc..
            window.board = window.saved.board
            // Set the obstacles (mainly walls but can be other obstacles as well)
            window.obstacles = window.saved.obstacles
            // Set the players
            window.players = window.saved.players
            // Set the timer
            this.initialTimer = window.saved.timer
        } else{
            // Set map data such as walls, floors, objectives, and power-ups, etc..
            generateBoardData()
            // Set the obstacles (mainly walls but can be other obstacles as well)
            window.obstacles = window.obstacles.concat(window.board.walls)
            // Generate the players
            window.players = generatePlayers()
        }

        // Main game loop
        this.mainloop()
    }

    /**
     * The main game loop. It updates the game state and draws the game objects on the canvas.
     */
    mainloop() {
        // Calculate the FPS
        if (window.DEBUG) {
            window.fps_frameCount++
            const now = window.time()
            const elapsed = now - window.fps_lastTime

            if (elapsed > 1000) {
                window.fps = (window.fps_frameCount - window.fps_frameCountPrev)
                window.fps_lastTime = now
                window.fps_frameCountPrev = window.fps_frameCount
            }
        }

        // Limit the game speed
        const now = window.time()
        const elapsed = now - window.lastTime
        if (elapsed < CONST.SPF) {
            requestAnimationFrame(() => this.mainloop())
            return
        }
        window.lastTime = now

        // Clear the canvas
        ctx.clearRect(0, 0, $canvas.width, $canvas.height)

        if (this.finished) {
            window.sound.play("game_over")
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

        // DEBUG
        if (window.DEBUG) this.printDebugInfo()
    }



    /**
     * Update the game state
     */
    update() {
        // Update the UI
        updateUI()

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
            window.winner = window.board.objectives[0]?.team === CONST.TEAM_1_COLOR ? 1 : 2
            this.finished = true
            window.sceneFallback = 4
            window.setShowStartScreen(true)
        }

        // Check if the game is finished by players alive
        if (window.players.filter((player) => player.isDead()).length >= 1) {
            window.winner = window.players[0].isDead() ? 2 : 1
            this.finished = true
            window.sceneFallback = 4
            window.setShowStartScreen(true)
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
            // Take the objective
            objective.team = player.team
            objective.progress = 100
            return
        }
    }

    resume() {
        this.paused = false
        this.mainloop()
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

        // Add FPS counter
        ctx.fillText(`FPS (unthrottled): ${window.fps}`, 10, 44)

        // Time counter
        ctx.fillText(`Time: ${Math.floor(window.time()/1000)}s`, 10, 60)

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
