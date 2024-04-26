import PlayerSideMenu from "./PlayerSideMenu"
import { saveGlobals } from "../../public/js/data/globals.js";
import Canvas from "./Canvas"
import { useEffect } from "react";

const GameScreen = (props) => {

    useEffect(() => {
        // ESC key event listener
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                window.paused = true
                saveGlobals()

                // Change the screen to the start screen
                window.sound.get("music_game").pause()
                window.sound.get("music_menu").play()

                // Show the start screen
                props.setShowStartScreen(true)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <>
            <PlayerSideMenu name={"Player 1"} id={"1"} />
            <div className="game">
                <Canvas />
            </div>
            <PlayerSideMenu name={"Player 2"} id={"2"} />
        </>
    );
};

export default GameScreen
