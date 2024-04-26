import { useEffect, useState } from "react"
import "./App.css"
import GameScreen from "./components/GameScreen.jsx"
import StartScreen from "./components/StartScreen.jsx"

const App = () => {
    console.log(window.DEBUG ? "Debug mode" : "Production mode")
    const [showStartScreen, setShowStartScreen] = useState(window.DEBUG ? false : true)
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        const sound = window.sound.get("music_menu")
        sound.loop = true

        const handleClick = () => {
            if (firstLoad) {
                sound.play()
                setFirstLoad(false)
            }
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        }
    }, [firstLoad])

    useEffect(() => {
        if (!showStartScreen){
            window.sound.get("music_menu").pause()
            window.sound.get("music_game").play()
        }
    }, [showStartScreen])

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                console.log(e.key)
                if (window.saved) setShowStartScreen(false)
            }
        })

        return () => removeEventListener("keydown", () => {})
    }, [])

    return <div className="app">{showStartScreen ? <StartScreen setShowStartScreen={setShowStartScreen} /> : <GameScreen setShowStartScreen={setShowStartScreen}/>}</div>
}

export default App
