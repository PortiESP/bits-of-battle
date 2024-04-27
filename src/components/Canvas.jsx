import { useEffect, useState } from "react"
import globalsSetup from "../../public/js/data/globals"
import setupEvents from "../../public/js/utils/events.js"
import Game from "../../public/js/game.js"
import CONST from "../../public/js/data/constants.js"

const Canvas = () => {
    const [remRes, setRemRes] = useState(window.resources?.remainingResources()|| 100)
    const totalRes =  Object.keys(window.resources?.images||{}).length

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
            setRemRes(window.resources?.remainingResources())
            if (remRes === 0) { 
                clearInterval(int)
            }
        }, 100)
    }, [])

    const fallbackSize = {width: CONST.CANVAS_WIDTH, height: CONST.CANVAS_HEIGHT}

    return (
        <>
            <canvas id="screen" className={`${remRes !== 0 ? "hidden": ""}`}></canvas>
            {
                remRes !== 0 && <div className="canvas-fallback" style={fallbackSize}>
                    <h1>Loading...</h1>
                    <p>It seems that the game is still loading. Please wait a few seconds.</p>
                    <div className="loading-progress">
                        <div className="progress-bar" style={{width: `${(totalRes-remRes) / totalRes  * 100}%`}}></div>
                    </div>
                </div>
            }
        </>
    )
}

export default Canvas
