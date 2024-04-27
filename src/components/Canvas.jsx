import { useEffect, useState } from "react"
import globalsSetup from "../../public/js/data/globals"
import setupEvents from "../../public/js/utils/events.js"
import Game from "../../public/js/game.js"

const Canvas = () => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        // ==========[ Globals ]==========================>
        globalsSetup()
        
        // ==========[ Create the game ]==================>
        window.game = new Game(window.$canvas)
        
        // ==========[ Event Listeners ]==================>
        setupEvents(window.game)
    }, [])

    useEffect(() => {
        // Wait until the game resources is loaded
        const int = setInterval(() => {
            if (window.resources?.isReady()) {
                setReady(true)
                clearInterval(int)
            }
        }, 100)
    }, [])

    return (
        <>
            <canvas id="screen" className={`${!ready ? "hidden": ""}`}></canvas>
            {
                !ready && <div className="loading">
                    <h1>Loading...</h1>
                </div>
            }
        </>
    )
}

export default Canvas
