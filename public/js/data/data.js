/**
 * The main idea of this file is to store all the data that will be used in the game as global variables.
 *
 * --- How to use ---
 * 1. Assign the data to the window object in this file.
 * 2. Access the data from the window object in other files.
 *
 */

// ====================[ Constants ]====================>
window.DEBUG = false
window.RANDOM_PATTERN = false

// ====================[ Global variables ]====================>
window.$canvas = document.getElementById("screen")
const $canvas = window.$canvas;

window.ctx = $canvas.getContext("2d")

window.mouse = { x: 0, y: 0 }
window.players = []
const { x, y } = $canvas.getBoundingClientRect() // Get the offset of the canvas
window.canvasOffset = { x, y }

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
window.secondaryFlagsCoords = () => {
    const { x: cx, y: cy } = window.canvasDims().center // Get the center of the canvas
    const [cx_2, cy_2] = [cx / 2, cy / 2] // Half of the center
    return [
        [cx - cx_2, cy - cy_2],
        [cx - cx_2, cy + cy_2],
        [cx + cx_2, cy + cy_2],
        [cx + cx_2, cy - cy_2],
    ]
}
