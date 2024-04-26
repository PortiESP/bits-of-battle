import "../../../styles/StartScreenMenus/MainMenuPlayer.css"
import Button from "../../Button"
import { useState, useEffect } from "react"

export default function MainMenuPlayer(props) {
    const skinsData = [
        "blueNinja",
        "greenNinja",
        "flame",
        "ninjaYellow",
        "noble",
        "spirit"
    ]
    
    const [skin, setSkin] = useState(props.id - 1 || 0)

    // Initialize window object
    useEffect(() => {
        window.skins = window.skins || ["blueNinja", "greenNinja"]
    }, [])

    // Update the window object
    useEffect(() => {
        window.skins[props.id - 1] = skinsData[skin]
        console.log(window.skins)
    }, [skin])

    // Style for the sprite
    const style = {
        backgroundImage: `url(assets/characters/${skinsData[skin]}/character-${skinsData[skin]}.png)`,
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