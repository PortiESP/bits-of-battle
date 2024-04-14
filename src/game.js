console.log('Game.js is connected')
class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
    }
}