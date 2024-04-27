import { useEffect, useState, useRef } from "react"
import Button from "../Button"
import "../../styles/StartScreenMenus/EndScreen.css"

export default function EndScreen(props) {

    const backToMenu = () => {
        window.saved = undefined
        window.setScene(0)
    }

    return (
        <div className={"endscreen"}>
            {
                    <>
                        <h1>Game Over</h1>
                        <h2>Player {window.winner} Wins!</h2>
                        <div className="endscreen-buttons">
                            <Button color="#ff3333" onClick={backToMenu}>Back to Menu</Button>
                        </div>
                    </>
            }
        </div>
    )
}