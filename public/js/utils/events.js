/*
    This file is intended to store all the calls to the `window.addEventListener` method.
*/

export default function setupEvents(game) {
    // Resize the canvas when the window is resized
    // window.addEventListener("resize", () => game.resizeCanvas())

    // Update the mouse position
    window.addEventListener("mousemove", (e) => {
        const { x: dx, y: dy } = $canvas.getBoundingClientRect()
        window.mouse = { x: e.clientX - dx, y: e.clientY - dy }
    })

    // Update the keys pressed
    window.addEventListener("keydown", (e) => {
        if (window.DEBUG) console.log("DOWN:" + e.key, e.code)

        const key = e.key.toLowerCase()
        window.keys[key] = true
    })

    // Update the keys released
    window.addEventListener("keyup", (e) => {
        if (window.DEBUG) console.log("UP:" + e.key)

        const key = e.key.toLowerCase()
        window.keys[key] = false
    })

    // Update the mouse buttons pressed
    window.addEventListener("mousedown", (e) => {
        if (window.DEBUG) console.log("CLICK:" + e.button)

        // Buttons: 0 = left, 1 = middle, 2 = right
        window.keys[`mouse${e.button}`] = true
    })

    // Update the mouse buttons released
    window.addEventListener("mouseup", (e) => {
        if (window.DEBUG) console.log("RELEASE:" + e.button)

        // Buttons: 0 = left, 1 = middle, 2 = right
        window.keys[`mouse${e.button}`] = false
    })
}
