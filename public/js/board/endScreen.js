export function drawEndScreen() {
    // Get the canvas and context from the window object
    const $canvas = window.$canvas
    const ctx = window.ctx

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(0, 0, $canvas.width, $canvas.height)

    // Draw the end screen
    ctx.font = "50px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Game Over", $canvas.width / 2, $canvas.height / 2 - 50)

    ctx.font = "30px Arial"
    ctx.fillText(`Winner: ${window.game.winner}`, $canvas.width / 2, $canvas.height / 2 + 50)
}
