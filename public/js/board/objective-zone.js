import CONST from "../data/constants.js"

const ctx = window.ctx

/**
 * Converts the progress of the objective into radians
 * @param {int} progress Number between 0 and 100
 * @returns The radians that the progress represents
 */
function progressToRadians(progress) {
    return (progress / 100) * Math.PI * 2
}

/**
 * Draws the objective zones (flag zones)
 */
export default function drawObjectiveZones() {
    const PI2 = Math.PI * 2

    // Draw the objective zones
    window.objectives.forEach(({ x, y, team, progress, size }, i) => {
        ctx.beginPath()
        ctx.strokeStyle = team ? team : CONST.FLAG_ZONE_COLOR
        ctx.arc(x, y, size, 0, progressToRadians(progress))
        ctx.stroke()
        ctx.strokeStyle = CONST.FLAG_ZONE_COLOR
        ctx.arc(x, y, size, progressToRadians(progress), PI2)
        ctx.stroke()
    })
}
