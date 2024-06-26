import CONST from "../../../../public/js/data/constants"
import "../../../styles/StartScreenMenus/MainMenuPlayer.css"
import Button from "../../Button"
import { useState, useEffect } from "react"

export default function MainMenuPlayer(props) {
    const skinsData = CONST.CHARACTERS_NAMES
    
    const [skin, setSkin] = useState(skinsData.indexOf(window.skins && window.skins[props.id - 1] || skinsData[props.id - 1]))

    // Initialize window object
    useEffect(() => {
        window.skins = window.skins || ["BlueNinja", "GreenNinja"]
    }, [])

    // Update the window object
    useEffect(() => {
        window.skins[props.id - 1] = skinsData[skin]
    }, [skin])

    // Style for the sprite
    const style = {
        backgroundImage: `url(assets/characters/${skinsData[skin]}/Walk.png)`,
    }

    // Update the skin based on the value
    const updateSkin = (value) => {
        if (value < 0) value = skinsData.length - 1
        else if (value >= skinsData.length) value = 0

        setSkin(value)
    }

    return (
        <div className={"main-player"}>
            <div className={"main-sprite-frame"} style={style}></div>
            <span className={"main-sprite-title"}>Player {props.id || 0}</span>
            <div className="main-btn-container">
                <Button color="#A79578" onClick={() => updateSkin(skin - 1)}>&lt;</Button>
                <Button color="#A79578" onClick={() => updateSkin(skin + 1)}>&gt;</Button>
            </div>
            <span className={"main-label"}>Choose your character</span>
        </div>
    )
}