const $start = document.getElementById("start")
const $pause = document.getElementById("pause")
const $reset = document.getElementById("reset")

export default function setupEvents(game) {
    window.addEventListener("resize", () => game.resizeCanvas())
    $start.addEventListener("click", () => game.start())
    $pause.addEventListener("click", () => game.pause())
    $reset.addEventListener("click", () => game.reset())
}
