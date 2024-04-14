import Game from "./src/game.js"
import setupEvents from "./src/events.js"

// ==========[ Create the game ]====================================================>
const game = new Game(window.$canvas)

// ==========[ Event Listeners ]================================================>
setupEvents(game)
