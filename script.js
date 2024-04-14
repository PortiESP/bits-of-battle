
import Game from './src/game.js'
import CONST from "./src/constants.js"

//===========[ Retrieve Elements ]==============================================>
const $canvas = document.getElementById('screen')
const $start = document.getElementById('start')
const $pause = document.getElementById('pause')
const $reset = document.getElementById('reset')

//===========[ Canvas Settings ]================================================>
const ctx = $canvas.getContext('2d')

function initSettings() {
    $canvas.width = window.innerWidth * 3/4
    $canvas.height = window.innerHeight * 3/4
    drawBoard()
}

function drawBoard() {
    ctx.fillStyle = CONST.BOARD_COLOR
    ctx.fillRect(0, 0, $canvas.width, $canvas.height)

    const team1Base = {
        color: CONST.TEAM_1_COLOR,
        x: 0,
        y: $canvas.height * 1/6,
        width: $canvas.width * 2 / 12,
        height: $canvas.height * 4/6
    }

    const team2Base = {
        color: CONST.TEAM_2_COLOR,
        x: $canvas.width * 10/12,
        y: $canvas.height * 1/6,
        width: $canvas.width * 2 / 12,
        height: $canvas.height * 4/6
    }

    // Draw team 1 Base
    ctx.fillStyle = team1Base.color
    ctx.fillRect(team1Base.x, team1Base.y, team1Base.width, team1Base.height)

    // Draw team 2 Base
    ctx.fillStyle = team2Base.color
    ctx.fillRect(team2Base.x, team2Base.y, team2Base.width, team2Base.height)
}


// ==========[ Event Listeners ]================================================>
window.addEventListener('resize', initSettings)
$start.addEventListener('click', () => game.start())
$pause.addEventListener('click', () => game.pause())
$reset.addEventListener('click', () => game.reset())

// Init
const game = new Game($canvas)
initSettings()