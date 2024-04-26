import { useState } from "react"
import "./App.css"
import GameScreen from "./components/GameScreen.jsx"
import StartScreen from "./components/StartScreen.jsx"

const App = () => {
    console.log(window.DEBUG ? "Debug mode" : "Production mode")
    const [showStartScreen, setShowStartScreen] = useState(window.DEBUG ? false : true)

    return <div className="app">{showStartScreen ? <StartScreen setShowStartScreen={setShowStartScreen} /> : <GameScreen />}</div>
}

export default App
