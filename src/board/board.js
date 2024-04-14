import CONST from "../data/constants.js"
import drawFlagZones from "./flag-zone.js"

// Get the canvas and context from the window object
const $canvas = window.$canvas
const ctx = window.ctx

/**
 * Draws the base graphics of the game
 */
export function drawBoard() {
    // Draw background
    ctx.fillStyle = CONST.BOARD_COLOR
    ctx.fillRect(0, 0, $canvas.width, $canvas.height)

    // Setup base dimensions
    const baseWidth = $canvas.width / 12
    const baseHeight = ($canvas.height * 2) / 3
    const baseCenterY = $canvas.height / 2 - baseHeight / 2

    const team1Base = {
        color: CONST.TEAM_1_COLOR,
        x: -3,
        y: baseCenterY,
        width: baseWidth,
        height: baseHeight,
    }

    const team2Base = {
        color: CONST.TEAM_2_COLOR,
        x: $canvas.width - baseWidth + 3,
        y: baseCenterY,
        width: baseWidth,
        height: baseHeight,
    }

    // Setup dashed line
    ctx.setLineDash([10, 10])
    ctx.lineWidth = 5

    // Draw team 1 Base
    ctx.strokeStyle = team1Base.color
    ctx.strokeRect(team1Base.x, team1Base.y, team1Base.width, team1Base.height)

    // Draw team 2 Base
    ctx.strokeStyle = team2Base.color
    ctx.strokeRect(team2Base.x, team2Base.y, team2Base.width, team2Base.height)

    // Reset line dash
    ctx.setLineDash([])

    // Draw the flag zones
    drawFlagZones()
}
