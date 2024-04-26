import { useEffect, useState } from "react"
import "../styles/StartScreen.css"
import MainMenu from "./menu_scenes/MainMenu"
import ControlsMenu from "./menu_scenes/ControlsMenu"
import HowToPlayMenu from "./menu_scenes/HowToPlayMenu"
import SmallScreen from "./menu_scenes/SmallScreen"

const StartScreen = ({ setShowStartScreen }) => {
    const [scene, setScene] = useState(0)
    const funcs = { setScene, setShowStartScreen }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1360) {
                setScene(3)
            } else {
                setScene(0)
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
                (scene === 2 && <ControlsMenu {...funcs} />) ||
                (scene === 3 && <SmallScreen />)
            }
        </div>
    )
}

export default StartScreen
