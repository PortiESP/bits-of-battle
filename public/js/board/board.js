import { RectWall } from "../power_ups/wall.js"
import { mapData } from "./map.js"
import CONST from "../data/constants.js"
import Player from "../player/player"
import Objective from "./objective.js"
import { AttackBoost } from "../power_ups/attack_boost.js"
import { Teleport } from "../power_ups/teleport.js"
import { Heal } from "../power_ups/heal.js"
import { Shield } from "../power_ups/shield.js"
import { Ghost } from "../power_ups/ghost.js"
import { Tornado } from "../power_ups/tornado.js"

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
        }
    }

    // Assigning global variables
    window.board.walls = walls
    window.board.floors = floors
    window.board.map = mapData.map
    window.board.objectives = generateObjectiveZones()
    window.board.powerUps = generatePowerUps()
    window.board.spawn1 = {...mapData.spawn1, x: mapData.spawn1.col * CONST.CELL_SIZE, y: mapData.spawn1.row * CONST.CELL_SIZE}
    window.board.spawn2 = {...mapData.spawn2 , x: mapData.spawn2.col * CONST.CELL_SIZE, y: mapData.spawn2.row * CONST.CELL_SIZE}
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

    // Draw the spawn points
    ctx.drawImage(images.player1.img, window.board.spawn1.x, window.board.spawn1.y, CONST.CELL_SIZE, CONST.CELL_SIZE)
    ctx.drawImage(images.player2.img, window.board.spawn2.x, window.board.spawn2.y, CONST.CELL_SIZE, CONST.CELL_SIZE)
    
    // Draw the objective zones
    window.board.objectives.forEach((objective) => objective.draw())

    // Draw the power-ups
    window.board.powerUps.forEach((powerUp) => powerUp.draw())
    
    // Players
    window.players.forEach((player) => player.draw())

    // Draw the walls
    window.board.walls.forEach((wall) => wall.draw())


}

/**
 * Returns an array of objective zone objects
 * @returns {Array} An array of objective zone objects
 */
export function generateObjectiveZones() {
    return mapData.objectives.map((data, i) => new Objective(i, data.row, data.col))
}

export function generatePowerUps() {
    const types = ["attack-boost", "heal", "shield", "ghost", "tornado"]
    const puList = mapData.powerUpSpanws.map((data) => {
        // Pick a random power-up type
        const type = types[Math.floor(Math.random() * types.length)]
        return { type, row: data.row, col: data.col }
    })

    mapData.teleportSpawns.forEach((data) => {
        puList.push({ type: "teleport", row: data.row, col: data.col, toRow: data.toRow, toCol: data.toCol })
    })
        

    return puList.map((data) => {
        switch (data.type) {
            case "wall":
                return new RectWall(data.row, data.col)
            case "attack-boost":
                return new AttackBoost(data.row, data.col, CONST.ATTACK_BOOST)
            case "teleport":
                return new Teleport(data.row, data.col, data.toRow, data.toCol)
            case "heal":
                return new Heal(data.row, data.col)
            case "shield":
                return new Shield(data.row, data.col)
            case "ghost":
                return new Ghost(data.row, data.col)
            case "tornado":
                return new Tornado(data.row, data.col)
            default:
                throw new Error(`Invalid power-up type: ${data.type}. Please check the board/map.js file an check that every power-up matches the available types in this switch statement.`)
        }
    })
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
    const controls1 = window.customControls1 || CONST.CONTROLS_P1
    const controls2 = window.customControls2 || CONST.CONTROLS_P2
    const p1 = new Player(window.board.spawn1.x, window.board.spawn1.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR, controls1)
    const p2 = new Player(window.board.spawn2.x, window.board.spawn2.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_2_COLOR, controls2)

    return [p1, p2]
}
