import { useEffect, useState } from "react"
import "../styles/StartScreen.css"
import MainMenu from "./menu_scenes/MainMenu"
import ControlsMenu from "./menu_scenes/ControlsMenu"
import HowToPlayMenu from "./menu_scenes/HowToPlayMenu"
import SmallScreen from "./menu_scenes/SmallScreen"
import CreditsMenu from "./menu_scenes/CreditsMenu"
import SettingsMenu from "./menu_scenes/SettingsMenu"
import EndScreen from "./menu_scenes/EndScreen"

const StartScreen = ({ setShowStartScreen }) => {
    const [scene, setScene] = useState(window.sceneFallback || 0)
    const funcs = { setScene, setShowStartScreen }
    
    window.setScene = setScene
    window.setShowStartScreen = setShowStartScreen

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1360) {
                setScene(99)
            } 
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className={"container"} >
            {
                (scene === 0 && <MainMenu {...funcs} />) ||
                (scene === 1 && <HowToPlayMenu {...funcs} />) || 
                (scene === 2 && <SettingsMenu {...funcs} />) ||
                (scene === 2_1 && <ControlsMenu {...funcs} />) ||
                (scene === 3 && <CreditsMenu {...funcs} />) ||
                (scene === 4 && <EndScreen {...funcs} />) ||
                (scene === 99 && <SmallScreen {...funcs}/>)
            }
        </div>
    )
}

export default StartScreen
