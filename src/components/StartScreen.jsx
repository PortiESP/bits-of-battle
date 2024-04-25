import { useState } from "react"
import "../styles/StartScreen.css"
import MainMenu from "./menu_scenes/MainMenu"

const StartScreen = ({ setShowStartScreen }) => {
    const [scene, setScene] = useState(0)
    const funcs = { setScene, setShowStartScreen }

    return <div className={"container"}>{scene === 0 && <MainMenu {...funcs} />}</div>
}

export default StartScreen
