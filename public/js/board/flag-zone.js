import CONST from "../data/constants.js"

const ctx = window.ctx

function progressToRadians(progress) {
    return (progress / 100) * Math.PI * 2
}

export default function drawFlagZones() {
    const { x: cx, y: cy } = window.canvasDims().center // Get the center of the canvas
    const PI2 = Math.PI * 2

    // Draw the flag zones
    ctx.strokeStyle = CONST.FLAG_ZONE_COLOR
    // Draw the secondary flag zones
    window.objectives.forEach(({ x, y, team, progress }, i) => {
        const size = i === 0 ? CONST.MAIN_OBJECTIVE_SIZE : CONST.OBJECTIVE_SIZE
        ctx.beginPath()
        ctx.strokeStyle = team ? team : CONST.FLAG_ZONE_COLOR
        ctx.arc(x, y, size, 0, progressToRadians(progress))
        ctx.stroke()
        ctx.strokeStyle = CONST.FLAG_ZONE_COLOR
        ctx.arc(x, y, size, progressToRadians(progress), PI2)
        ctx.stroke()
    })
}
