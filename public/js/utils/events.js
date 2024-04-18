export default function setupEvents(game) {
    window.addEventListener("resize", () => game.resizeCanvas())
    window.addEventListener("mousemove", (e) => {
        const { x: dx, y: dy } = $canvas.getBoundingClientRect()
        window.mouse = { x: e.clientX - dx, y: e.clientY - dy }
    })

    window.addEventListener("keydown", (e) => {
        if (window.DEBUG) console.log("DOWN:" + e.key)

        const key = e.key.toLowerCase()
        window.keys[key] = true
    })

    window.addEventListener("keyup", (e) => {
        if (window.DEBUG) console.log("UP:" + e.key)

        const key = e.key.toLowerCase()
        window.keys[key] = false
    })
}
