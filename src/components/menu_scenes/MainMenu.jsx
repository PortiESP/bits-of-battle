import weaponSprite from "../../../public/assets/weapons/weapon-axe.png"
import "../../styles/StartScreenMenus/MainMenu.css"

export default function MainMenu(props) {
    return (
        <>
            <h1 className={"title"}>Bits Of Battle</h1>
            <div className={"arcadePanel"}>
                <div className={"gameSprites"}>
                    <img className={"weapon sprite"} src={weaponSprite} alt="Weapon Sprite" />
                </div>
                <button className={"playButton"} onClick={() => props.setShowStartScreen(false)}>
                    Play
                </button>
                <button className={"playButton"} onClick={() => props.setScene(1)}>
                    Controls
                </button>
            </div>
        </>
    )
}
