import { useEffect, useState } from "react"
import "../styles/StartScreen.css"
import MainMenu from "./menu_scenes/MainMenu"
import ControlsMenu from "./menu_scenes/ControlsMenu"
import HowToPlayMenu from "./menu_scenes/HowToPlayMenu"

const StartScreen = ({ setShowStartScreen }) => {
    const [scene, setScene] = useState(0)
    const funcs = { setScene, setShowStartScreen }


    return (
        <div className={"container"} >
            {
                (scene === 0 && <MainMenu {...funcs} />) ||
                (scene === 1 && <HowToPlayMenu {...funcs} />) || 
                (scene === 2 && <ControlsMenu {...funcs} />)
            }
        </div>
    )
}

export default StartScreen
