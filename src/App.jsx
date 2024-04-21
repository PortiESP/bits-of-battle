import { useState } from "react"
import "./App.css"
import GameScreen from "./components/GameScreen.jsx"
import StartScreen from "./components/StartScreen.jsx"

const App = () => {
    console.log(window.DEBUG ? "Debug mode" : "Production mode")
    const [showStart, setShowStart] = useState(window.DEBUG ? false : true)

    return <div className="app">{showStart ? <StartScreen action={() => setShowStart(false)} /> : <GameScreen />}</div>
}

export default App
