import Game from "./src/game.js"
import { $canvas } from "./src/data.js"
import setupEvents from "./src/events.js"

// ==========[ Create the game ]====================================================>
const game = new Game($canvas)

// ==========[ Event Listeners ]================================================>
setupEvents(game)
