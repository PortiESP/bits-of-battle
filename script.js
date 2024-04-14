import Game from "./src/game.js"
import setupEvents from "./src/utils/events.js"

// ==========[ Create the game ]====================================================>
window.game = new Game(window.$canvas)

// ==========[ Event Listeners ]================================================>
setupEvents(game)
