import Game from "./game.js"
import { resources } from "./utils/resources.js"
import setupEvents from "./utils/events.js"

// ==========[ Create the game ]====================================================>
window.game = new Game(window.$canvas)
window.resources = resources

// ==========[ Event Listeners ]================================================>
setupEvents(window.game)
