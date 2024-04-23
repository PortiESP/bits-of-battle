import { RectWall } from "../power_ups/wall.js"
import { resources } from "../utils/resources.js"
import { mapData } from "./map.js"
import CONST from "../data/constants.js"
import Player from "../player/player"
import Objective from "./objective.js"

export function generateBoardData() {
    const walls = [] // Array of {x, y, row, col}
    const floors = [] // Array of {x, y, row, col}

    for (let row = 0; row < mapData.height; row++) {
        for (let col = 0; col < mapData.width; col++) {
            const current = mapData.map[row][col]
            const x = col * mapData.pixelSize
            const y = row * mapData.pixelSize

            // Walls of floors
            if (current === CONST.WALL_ID) {
                walls.push({ x, y, row: y, col: x })
                continue
            } else floors.push({ x, y, row: y, col: x })

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
    window.board.powerUps = mapData.powerUps.map((data) => ({ ...data, x: data.col * mapData.pixelSize, y: data.row * mapData.pixelSize }))
}

/**
 * Draws the base graphics of the game (background, bases, and objective zones)
 */
export function drawBoard() {
    // Get the canvas and context from the window object
    const ctx = window.ctx

    if (!resources.isReady()) return
    const images = resources.images

    // Draw the background
    window.board.floors.forEach((floor) => ctx.drawImage(images.floor.img, floor.x, floor.y, mapData.pixelSize, mapData.pixelSize))
    window.board.walls.forEach((wall) => ctx.drawImage(images.background.img, wall.x, wall.y, mapData.pixelSize, mapData.pixelSize))

    // Draw the spawn points
    ctx.drawImage(images.player1.img, window.board.spawn1.x, window.board.spawn1.y, mapData.pixelSize, mapData.pixelSize)
    ctx.drawImage(images.player2.img, window.board.spawn2.x, window.board.spawn2.y, mapData.pixelSize, mapData.pixelSize)

    // Draw the objective zones
    window.board.objectives.forEach((objective) => ctx.drawImage(images.objective.img, objective.drawX, objective.drawY, mapData.pixelSize, mapData.pixelSize))

    // Draw the power-ups
    window.board.powerUps.forEach((powerUp) => ctx.drawImage(images.powerUp.img, powerUp.x, powerUp.y, mapData.pixelSize, mapData.pixelSize))
}

/**
 * Returns an array of wall objects
 * @returns {Array} An array of wall objects
 */
export function generateBoardWalls() {
    return window.board.walls.map((wall) => new RectWall(wall.x, wall.y, mapData.pixelSize, mapData.pixelSize))
}

/**
 * Returns an array of objective zone objects
 * @returns {Array} An array of objective zone objects
 */
export function generateObjectiveZones() {
    return mapData.objectives.map((data, i) => new Objective(i, data.row, data.col))
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
