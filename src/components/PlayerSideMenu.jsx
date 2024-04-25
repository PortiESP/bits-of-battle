import "../styles/PlayerSideMenu.css"
import { useEffect, useRef } from "react"
import Stat from "./Stat"
import CONST from "../../public/js/data/constants"

export default function PlayerSideMenu({ name, id }) {
    const sprite = useRef(null)

    useEffect(() => {
        const character = CONST.PLAYER_1_ID === id ? CONST.PLAYER_1_CHARACTER : CONST.PLAYER_2_CHARACTER
        const image = `/assets/characters/${character}/character-${character}.png`
        sprite.current.style.backgroundImage = `url(${image})`
    }, [])

    return (
        <div className={"wrapper"}>
            <aside id={id}>
                <h1 className={"title"}>{name}</h1>
                <div className={"sprite-preview"}>
                    <i className={"sprite pixelated"} ref={sprite}></i>
                </div>
                <div className="stats">
                    <Stat team={id} label={"Health"} value={CONST.MAX_PLAYER_HEALTH} />
                    <Stat team={id} label={"Attack"} value={CONST.BASE_PLAYER_ATTACK} />
                    <Stat team={id} label={"Defense"} value={CONST.BASE_PLAYER_DEFENSE} />
                    <Stat team={id} label={"Flags"} value={0} />
                </div>
            </aside>
        </div>
    )
}
