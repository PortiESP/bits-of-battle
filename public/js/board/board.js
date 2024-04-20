import { resources } from "../utils/resources.js"
import { mapData } from "./map.js"

// Get the canvas and context from the window object
const $canvas = window.$canvas
const ctx = window.ctx

/**
 * Draws the base graphics of the game (background, bases, and objective zones)
 */
export function drawBoard() {
    if (!resources.isReady()) return
    const images = resources.images

    for (let x = 0; x < mapData.width * mapData.pixelSize; x += mapData.pixelSize) {

        for (let y = 0; y < mapData.height * mapData.pixelSize; y += mapData.pixelSize) {

            const current = mapData.map[y / mapData.pixelSize][x / mapData.pixelSize]

            if (current === "W") {
                ctx.drawImage(images.background.img, x, y, mapData.pixelSize, mapData.pixelSize)
                
            } else {
                ctx.drawImage(images.floor.img, x, y, mapData.pixelSize, mapData.pixelSize)
            }
        }
    }
}
