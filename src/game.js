import { drawBoard } from "./board/board.js"
import CONST from "./data/constants.js"
import Player from "./player/player.js"

const ctx = window.ctx
const $canvas = window.$canvas

class Game {
    constructor() {
        // Resize canvas
        this.resizeCanvas()
        this.main()

        // DEBUG
        const { width, center } = window.canvasDims()
        window.players = [new Player(140, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_1_COLOR), new Player(width - 140, center.y, CONST.BASE_PLAYER_SIZE, CONST.TEAM_2_COLOR)]
    }

    main() {
        requestAnimationFrame(() => this.main())
        ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        this.draw()
    }

    draw() {
        drawBoard()
        window.players.forEach((player) => {
            player.update()
            player.draw()
        })
    }

    resizeCanvas() {
        $canvas.width = window.innerWidth * CONST.CANVAS_WINDOW_RATIO
        $canvas.height = window.innerWidth * CONST.CANVAS_WINDOW_RATIO * CONST.CANVAS_ASPECT_RATIO
        const { x, y } = $canvas.getBoundingClientRect()
        window.canvasOffset = { x, y }
    }
}

export default Game
