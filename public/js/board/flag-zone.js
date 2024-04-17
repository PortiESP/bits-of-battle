import CONST from "../data/constants.js"

const ctx = window.ctx

export default function drawFlagZones() {
    const centerSize = 100 // Size of the center flag zones
    const checkpointSize = 50 // Size of the secondary flag zones
    const { x: cx, y: cy } = window.canvasDims().center // Get the center of the canvas
    const flagZoneCoords = window.secondaryFlagsCoords() // Get secondary flag zone coordinates
    const PI2 = Math.PI * 2

    // Draw the flag zones
    ctx.strokeStyle = CONST.FLAG_ZONE_COLOR
    // Draw the secondary flag zones
    flagZoneCoords.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, checkpointSize, 0, PI2)
        ctx.stroke()
    })

    // Draw the center flag zone
    ctx.beginPath()
    ctx.arc(cx, cy, centerSize, 0, PI2)
    ctx.stroke()
}
