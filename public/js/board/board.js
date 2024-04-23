import { RectWall } from "../power_ups/wall.js"
import { mapData } from "./map.js"
import CONST from "../data/constants.js"
import Player from "../player/player"
import Objective from "./objective.js"

export function generateBoardData() {
    const walls = [] // Array of RectWall objects
    const floors = [] // Array of {x, y, row, col}

    for (let row = 0; row < mapData.height; row++) {
        for (let col = 0; col < mapData.width; col++) {
            const current = mapData.map[row][col]
            const x = col * CONST.CELL_SIZE
            const y = row * CONST.CELL_SIZE

            // Generate Walls or floors
            // Walls
            if (current === CONST.WALL_ID) {
                walls.push(new RectWall(row, col))
                continue
            }
            // Floors
            else floors.push({ x, y, row: y, col: x })

            // Player spawns
            if (current === CONST.PLAYER_1_ID) window.board.spawn1 = { x, y, row: y, col: x }
            else if (current === CONST.PLAYER_2_ID) window.board.spawn2 = { x, y, row: y, col: x }
        }
    }

    // Assigning global variables
    window.board.walls = walls
    window.board.floors = floors
    window.board.map = mapData.map
    window.board.objectives = generateObjectiveZones()
    window.board.powerUps = generatePowerUps()
}

/**
 * Draws the base graphics of the game (background, bases, and objective zones)
 */
export function drawBoard() {
    // Get the canvas and context from the window object
    const ctx = window.ctx

    if (!window.resources.isReady()) return
    const images = window.resources.images

    // Draw the background
    window.board.floors.forEach((floor) => ctx.drawImage(images.floor.img, floor.x, floor.y, CONST.CELL_SIZE, CONST.CELL_SIZE))
    window.board.walls.forEach((wall) => wall.draw())

    // Draw the spawn points
    ctx.drawImage(images.player1.img, window.board.spawn1.x, window.board.spawn1.y, CONST.CELL_SIZE, CONST.CELL_SIZE)
    ctx.drawImage(images.player2.img, window.board.spawn2.x, window.board.spawn2.y, CONST.CELL_SIZE, CONST.CELL_SIZE)

    // Draw the objective zones
    window.board.objectives.forEach((objective) => ctx.drawImage(images.objective.img, objective.drawX, objective.drawY, CONST.CELL_SIZE, CONST.CELL_SIZE))

    // Draw the power-ups
    window.board.powerUps.forEach((powerUp) => ctx.drawImage(images.powerUp.img, powerUp.x, powerUp.y, CONST.CELL_SIZE, CONST.CELL_SIZE))
}

/**
 * Returns an array of objective zone objects
 * @returns {Array} An array of objective zone objects
 */
export function generateObjectiveZones() {
    return mapData.objectives.map((data, i) => new Objective(i, data.row, data.col))
}

export function generatePowerUps() {
    return mapData.powerUps.map((data) => ({ ...data, x: data.col * CONST.CELL_SIZE, y: data.row * CONST.CELL_SIZE }))
}

/**
 * Generates an array of Player objects based on the team, initial position, size, team color, and controls
 * @param {string} team The team of the players ("1" for player 1, "2" for player 2)
 * @param {object} initialPosition The initial position of the players
 * @param {number} size The size of the players
 * @param {string} teamColor The color of the players' team
 * @param {object} controls The controls for the players
 * @returns {Array} An array of Player objects
 */
export function generatePlayers() {
    return [new Player(window.board.spawn1.x, window.board.spawn1.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR, CONST.CONTROLS_P1), new Player(window.board.spawn2.x, window.board.spawn2.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_2_COLOR, CONST.CONTROLS_P2)]
}
