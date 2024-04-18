export default function setupEvents(game) {
    window.addEventListener("resize", () => game.resizeCanvas())
    window.addEventListener("mousemove", (e) => {
        const { x: dx, y: dy } = $canvas.getBoundingClientRect()
        window.mouse = { x: e.clientX - dx, y: e.clientY - dy }
    })
}
