import { RectWall } from "../power_ups/wall.js"
import { resources } from "../utils/resources.js"
import { mapData } from "./map.js"
import drawObjectiveZones from "./objective-zone.js"
import CONST from "../data/constants.js"
import Player from "../player/player"
/**
 * Draws the base graphics of the game (background, bases, and objective zones)
 */
export function drawBoard() {
    // Get the canvas and context from the window object
    const ctx = window.ctx

    if (!resources.isReady()) return
    const images = resources.images

    // Draw the background
    for (let x = 0; x < mapData.width * mapData.pixelSize; x += mapData.pixelSize) {
        for (let y = 0; y < mapData.height * mapData.pixelSize; y += mapData.pixelSize) {
            // Get the current tile
            const current = mapData.map[y / mapData.pixelSize][x / mapData.pixelSize]

            // Draw the corresponding image
            switch(current) {
                case CONST.WALL_ID:
                    ctx.drawImage(images.background.img, x, y, mapData.pixelSize, mapData.pixelSize)
                    break
                case CONST.OBJECTIVE_ID:
                    ctx.drawImage(images.objective.img, x, y, mapData.pixelSize, mapData.pixelSize)
                    break
                case CONST.POWERUP_ID:
                    ctx.drawImage(images.powerUp.img, x, y, mapData.pixelSize, mapData.pixelSize)
                    break
                case CONST.PLAYER_1_ID:
                    ctx.drawImage(images.player1.img, x, y, mapData.pixelSize, mapData.pixelSize)
                    break;
                case CONST.PLAYER_2_ID:
                    ctx.drawImage(images.player2.img, x, y, mapData.pixelSize, mapData.pixelSize)
                    break
                default:
                    ctx.drawImage(images.floor.img, x, y, mapData.pixelSize, mapData.pixelSize)
              }
              
        }
    }

    // Draw the objective zones
    drawObjectiveZones()
}

/**
 * Generic function to generate objects based on map data and a condition callback
 * @param {string} char The character to search for in the map data
 * @param {Function} callback A callback function that receives x, y coordinates and returns an object based on those coordinates
 * @returns {Array} An array of objects generated based on the condition callback
 */
export function generateObjects(char, callback) {
    const objects = [];
    for (let x = 0; x < mapData.width; x++) {
        for (let y = 0; y < mapData.height; y++) {
            if (mapData.map[y][x] === char) {
                objects.push(callback(x, y));
            }
        }
    }
    return objects;
}

/**
 * Returns an array of wall objects
 * @returns {Array} An array of wall objects
 */
export function generateBoardBounds() {
    return generateObjects("W", (x, y) => new RectWall(x * mapData.pixelSize, y * mapData.pixelSize, mapData.pixelSize, mapData.pixelSize));
}

/**
 * Returns an array of objective zone objects
 * @returns {Array} An array of objective zone objects
 */
export function generateObjectiveZones() {
    return generateObjects("O", (x, y) => ({
        x: x * mapData.pixelSize + mapData.pixelSize / 2,
        y: y * mapData.pixelSize + mapData.pixelSize / 2,
        size: CONST.OBJECTIVE_SIZE
    }));
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
export function generatePlayers(team, size, teamColor, controls) {
    return generateObjects(team, (x, y) => (new Player(x*mapData.pixelSize + mapData.pixelSize/2, y*mapData.pixelSize + mapData.pixelSize/2, size, teamColor, controls)));
}