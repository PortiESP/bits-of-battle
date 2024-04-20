import { resources } from "../utils/resources.js"

// Get the canvas and context from the window object
const $canvas = window.$canvas
const ctx = window.ctx

/**
 * Draws the base graphics of the game (background, bases, and objective zones)
 */
export function drawBoard() {
    // Draw background
    if (!resources.isReady()) return

    const images = resources.images

    for (let i = 0; i < 30 * 32; i += 32) {
        ctx.drawImage(images.background.img, i, 0)
    }
}
