import Game from "./game.js"
import setupEvents from "./utils/events.js"

// ==========[ Create the game ]====================================================>
window.game = new Game(window.$canvas)

// ==========[ Event Listeners ]================================================>
setupEvents(window.game)
