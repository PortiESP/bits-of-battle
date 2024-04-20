/**
 * The main idea of this file is to store all the data that will be used in the game as global variables.
 *
 * --- How to use ---
 * 1. Assign the data to the window object in this file.
 * 2. Access the data from the window object in other files.
 *
 */

import CONST from "./constants.js"

// ====================[ Global variables ]====================>
// Debug mode
window.DEBUG = true
// Canvas
window.$canvas = document.getElementById("screen")
const $canvas = window.$canvas
window.ctx = $canvas.getContext("2d")

// ====================[ Functions ]====================>
/**
 * Calculates the dimensions of the canvas
 * @returns Object with the dimensions of the canvas: { width, height, center: { x, y } }
 */
window.canvasDims = () => ({
    width: $canvas.width,
    height: $canvas.height,
    center: {
        x: $canvas.width / 2,
        y: $canvas.height / 2,
    },
})

/**
 * Calculates the coordinates of the objectives
 * @returns Object with the coordinates of the objectives: { x, y }
 */
window.calculateObjectivesCoords = () => {
    const { x: cx, y: cy } = window.canvasDims().center // Get the center of the canvas
    const [cx_2, cy_2] = [cx / 2, cy / 2] // Half of the center
    return [
        // Central objective zone
        { x: cx, y: cy, size: CONST.MAIN_OBJECTIVE_SIZE },
        // Secondary objective zones
        { x: cx - cx_2, y: cy - cy_2, size: CONST.OBJECTIVE_SIZE },
        { x: cx - cx_2, y: cy + cy_2, size: CONST.OBJECTIVE_SIZE },
        { x: cx + cx_2, y: cy + cy_2, size: CONST.OBJECTIVE_SIZE },
        { x: cx + cx_2, y: cy - cy_2, size: CONST.OBJECTIVE_SIZE },
    ]
}

// ====================[ Global variables ]====================>
window.mouse = { x: 0, y: 0 } // Mouse position, updated on mousemove
window.keys = {} // Keys pressed and mouse buttons clicked
window.teams = [CONST.TEAM_1_COLOR, CONST.TEAM_2_COLOR] // Teams in the game

// ====================[ Game variables ]====================>
// Players in the game
window.players = []
// Objectives in the game, updated on resize. This is an ARRAY o { x, y, id, team, progress }
window.objectives = window.calculateObjectivesCoords().map((coords, i) => ({ ...coords, id: i, team: null, progress: 0 }))
// Obstacules in the game, updated on resize. This is an ARRAY of objects (Wall): { x, y, size }
window.obstacles = []
