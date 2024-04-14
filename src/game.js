
class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
    }

    start() {
        // TODO: Implement this method
        console.log('Game Started')
    }

    pause() {
        // TODO: Implement this method
        console.log('Game Paused')
    }

    reset() {
        // TODO: Implement this method
        console.log('Game Reset')
    }
}

export default Game