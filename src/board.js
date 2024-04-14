import CONST from "./constants.js"
import { ctx, $canvas } from "./data.js"

export function drawBoard() {
    ctx.fillStyle = CONST.BOARD_COLOR
    ctx.fillRect(0, 0, $canvas.width, $canvas.height)

    const team1Base = {
        color: CONST.TEAM_1_COLOR,
        x: 0,
        y: ($canvas.height * 1) / 6,
        width: ($canvas.width * 2) / 12,
        height: ($canvas.height * 4) / 6,
    }

    const team2Base = {
        color: CONST.TEAM_2_COLOR,
        x: ($canvas.width * 10) / 12,
        y: ($canvas.height * 1) / 6,
        width: ($canvas.width * 2) / 12,
        height: ($canvas.height * 4) / 6,
    }

    // Draw team 1 Base
    ctx.fillStyle = team1Base.color
    ctx.fillRect(team1Base.x, team1Base.y, team1Base.width, team1Base.height)

    // Draw team 2 Base
    ctx.fillStyle = team2Base.color
    ctx.fillRect(team2Base.x, team2Base.y, team2Base.width, team2Base.height)
}
