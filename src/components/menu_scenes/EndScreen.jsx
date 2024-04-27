import { useEffect, useState, useRef } from "react"
import Button from "../Button"
import "../../styles/StartScreenMenus/EndScreen.css"

export default function EndScreen(props) {
    const [winner, setWinner] = useState(null)
    const [skin, setSkin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            if (!window.game.winner) return

            setWinner(window.game.winner)
            setSkin(window.skins[window.game.winner - 1])
            setLoading(false)
        }, 1000)
        
        return () => clearInterval(interval) // Clean up on unmount
    }, [])

    return (
        <div className={"endscreen"}>
            {
                loading ? <h1>Loading...</h1> :
                    <>
                        <h1>Game Over</h1>
                        <h2>Player {winner} Wins!</h2>
                        <div className="endscreen-buttons">
                            <Button color="#3ea325" onClick={() => window.setScene(0)}>Back to Menu</Button>
                            <Button color="#ff3333" onClick={() => window.setShowStartScreen(false)}>Play Again</Button>
                        </div>
                        {
                            window.game === null
                        }
                    </>
            }
        </div>
    )
}