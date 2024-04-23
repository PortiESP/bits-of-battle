/**
 * The main idea of this file is to store all the data that will be used in the game as global variables.
 *
 * --- How to use ---
 * 1. Assign the data to the window object in this file.
 * 2. Access the data from the window object in other files.
 *
 */

import CONST from "./constants.js"

export default function globalsSetup() {
    // ====================[ Global variables ]====================>
    // Canvas
    window.$canvas = document.getElementById("screen")
    window.$canvas.width = CONST.CANVAS_WIDTH
    window.$canvas.height = CONST.CANVAS_HEIGHT

    // Context
    const $canvas = window.$canvas
    window.ctx = $canvas.getContext("2d")
    window.ctx.imageSmoothingEnabled = true
    window.ctx.imageSmoothingQuality = "high"

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

    // ====================[ Global variables ]====================>
    window.mouse = { x: 0, y: 0 } // Mouse position, updated on mousemove
    window.keys = {} // Keys pressed and mouse buttons clicked
    window.teams = [CONST.TEAM_1_COLOR, CONST.TEAM_2_COLOR] // Teams in the game

    // ====================[ Game variables ]====================>
    // Players in the game
    window.players = []
    // Obstacules in the game, updated on resize. This is an ARRAY of objects (Wall): { x, y, size }
    window.obstacles = []
    // Board data
    window.board = {
        walls: [], // Data of the walls in the game {x, y, row, col}
        floors: [], // Data of the floors in the game {x, y, row, col}
        map: [], // Map of the game matrix of characters
        objectives: [], // Objectives in the game {x, y, row, col}
        powerUps: [], // PowerUps in the game {x, y, row, col, type}
    }
}
