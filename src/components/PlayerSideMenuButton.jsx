import { useCallback, useEffect } from "react"
import scss from "../styles/PlayerSideMenuButton.module.scss"

export default function PlayerSideMenuButton(props) {
    const handleClick = useCallback(() => {
        window.game.handlePowerUpEvent(window.teams[props.teamId], props.powerUp)
    }, [])

    return (
        <button className={scss.button} onClick={handleClick}>
            {props.value}
        </button>
    )
}
