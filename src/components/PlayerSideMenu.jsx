import "../styles/PlayerSideMenu.css"
import { useEffect, useRef, useState } from "react"
import Stat from "./Stat"
import CONST from "../../public/js/data/constants"

export default function PlayerSideMenu({ name, id }) {
    const sprite = useRef(null)

    useEffect(() => {
        const image = CONST.PLAYER_1_ID === id ? "/assets/character-ninja.png" : "/assets/character-dragon.png"
        sprite.current.style.backgroundImage = `url(${image})`
    }, []);

    return (
        <div className={"wrapper"}>
            <aside>
                <h1 className={"title"}>{name}</h1>
                <div className={"sprite-preview"}>
                    <div className={"sprite pixelated"} ref={sprite}></div>
                </div>
                <div className="stats">
                    <Stat label={"Health"} value={CONST.MAX_PLAYER_HEALTH} />
                    <Stat label={"Attack"} value={CONST.BASE_PLAYER_ATTACK} />
                    <Stat label={"Defense"} value={CONST.BASE_PLAYER_DEFENSE} />
                    <Stat label={"Captured Flags"} value={0} />
                </div>
            </aside>
        </div>
    )
}
