
import Game from './src/game.js'

const $canvas = document.getElementById('board')
console.log($canvas)
const context = $canvas.getContext('2d')

function initSettings() {
    $canvas.width = 500
    $canvas.height = 500 
    context.fillStyle = 'black'
    context.fillRect(0, 0, $canvas.width, $canvas.height)
}

const game = new Game($canvas)
console.log(game)
// Init
initSettings()