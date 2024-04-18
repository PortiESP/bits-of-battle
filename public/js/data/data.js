/**
 * The main idea of this file is to store all the data that will be used in the game as global variables.
 *
 * --- How to use ---
 * 1. Assign the data to the window object in this file.
 * 2. Access the data from the window object in other files.
 *
 */

// ====================[ Global variables ]====================>
window.DEBUG = true
// Canvas
window.$canvas = document.getElementById("screen")
const $canvas = window.$canvas
window.ctx = $canvas.getContext("2d")

// ====================[ Functions ]====================>
// Get the dimensions of the canvas
window.canvasDims = () => ({
    width: $canvas.width,
    height: $canvas.height,
    center: {
        x: $canvas.width / 2,
        y: $canvas.height / 2,
    },
})

// Secondary flag zone coordinates
window.calculateObjectivesCoords = () => {
    const { x: cx, y: cy } = window.canvasDims().center // Get the center of the canvas
    const [cx_2, cy_2] = [cx / 2, cy / 2] // Half of the center
    return [
        // Central flag zone
        { x: cx, y: cy },
        // Secondary flag zones
        { x: cx - cx_2, y: cy - cy_2 },
        { x: cx - cx_2, y: cy + cy_2 },
        { x: cx + cx_2, y: cy + cy_2 },
        { x: cx + cx_2, y: cy - cy_2 },
    ]
}

// ====================[ Global variables ]====================>
window.mouse = { x: 0, y: 0 }

// ====================[ Game variables ]====================>
window.players = [] // Players in the game
window.objectives = window.calculateObjectivesCoords().map((coords, i) => ({ ...coords, id: i, team: null, progress: 0 })) // Objectives in the game
