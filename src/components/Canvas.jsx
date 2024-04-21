import { useEffect } from "react"
import globalsSetup from "../../public/js/data/globals"
import { resources } from "../../public/js/utils/resources.js"
import setupEvents from "../../public/js/utils/events.js"
import Game from "../../public/js/game.js"

const Canvas = () => {
    useEffect(() => {
        // ==========[ Globals ]==========================>
        globalsSetup()

        // ==========[ Create the game ]==================>
        window.game = new Game(window.$canvas)
        window.resources = resources

        // ==========[ Event Listeners ]==================>
        setupEvents(window.game)
    }, [])

    return (
        <>
            <canvas id="screen"></canvas>
        </>
    )
}

export default Canvas
