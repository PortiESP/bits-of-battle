import { useEffect, useState } from "react"
import "./App.css"
import GameScreen from "./components/GameScreen.jsx"
import StartScreen from "./components/StartScreen.jsx"
import Sound from "../public/js/utils/sound.js"

const App = () => {
    console.log(window.DEBUG ? "Debug mode" : "Production mode")
    const [showStartScreen, setShowStartScreen] = useState(window.DEBUG ? false : true)

    useEffect(() => {
        window.sound = new Sound()
    }, [])

    return <div className="app">{showStartScreen ? <StartScreen setShowStartScreen={setShowStartScreen} /> : <GameScreen />}</div>
}

export default App
