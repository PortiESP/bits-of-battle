export default function setupEvents(game) {
    window.addEventListener("resize", () => game.resizeCanvas())
    window.addEventListener("mousemove", (e) => {
        const { x: dx, y: dy } = $canvas.getBoundingClientRect()
        window.mouse = { x: e.clientX - dx, y: e.clientY - dy }
    })
    
    window.addEventListener("keydown", (e) => {
        console.log("DOWN:" + e.key)
        if (e.key.toLowerCase() === "w") window.keys.w1 = true
        if (e.key.toLowerCase() === "a") window.keys.a1 = true
        if (e.key.toLowerCase() === "s") window.keys.s1 = true
        if (e.key.toLowerCase() === "d") window.keys.d1 = true

        if (e.key.toLowerCase() === "ArrowUp") window.keys.w2 = true
        if (e.key.toLowerCase() === "ArrowLeft") window.keys.a2 = true
        if (e.key.toLowerCase() === "ArrowDown") window.keys.s2 = true
        if (e.key.toLowerCase() === "ArrowRight") window.keys.d2 = true
    })

    window.addEventListener("keyup", (e) => {
        console.log("UP:" + e.key)
        if (e.key.toLowerCase() === "w") window.keys.w1 = false
        if (e.key.toLowerCase() === "a") window.keys.a1 = false
        if (e.key.toLowerCase() === "s") window.keys.s1 = false
        if (e.key.toLowerCase() === "d") window.keys.d1 = false

        if (e.key.toLowerCase() === "ArrowUp") window.keys.w2 = false
        if (e.key.toLowerCase() === "ArrowLeft") window.keys.a2 = false
        if (e.key.toLowerCase() === "ArrowDown") window.keys.s2 = false
        if (e.key.toLowerCase() === "ArrowRight") window.keys.d2 = false
    })
}
