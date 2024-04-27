import "../styles/PlayerSideMenu.css"
import Stat from "./Stat"
import CONST from "../../public/js/data/constants"

export default function PlayerSideMenu({ name, id }) {
    const character = CONST.PLAYER_1_ID === id ? window.skins[0] : window.skins[1]
    const image = `/assets/characters/${character}/Faceset.png`

    return (
        <div className={"wrapper"}>
            <aside id={id}>
                <h1 className={"title"}>{name}</h1>
                <div className={"sprite-preview"}>
                    <img src={image} className="sprite"/>
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
