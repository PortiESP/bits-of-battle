import weaponSprite from "../../../public/assets/weapon-axe.png"
import "../../styles/StartScreenMenus/MainMenu.css"
import Button from "../Button"
import MainMenuPlayer from "./main/MainMenuPlayer"

export default function MainMenu(props) {
    return (
        <>
            <h1 className={"title"}>Bits Of Battle</h1>
            <div className="main-wrapper">
                <MainMenuPlayer id={1} src={"../../../public/assets/characters/blueNinja/character-blueNinja.png"}/>
                <div className={"arcadePanel"}>
                    <div className={"gameSprites"}>
                        <img className={"weapon sprite"} src={weaponSprite} alt="Weapon Sprite" />
                    </div>
                    <Button color="#ff3333"  onClick={() => props.setShowStartScreen(false)}>
                        Play
                    </Button>
                    <Button color="#6e03F5" onClick={() => props.setScene(1)}>
                        How to Play!
                    </Button>
                    <Button color="#3ea325" onClick={() => props.setScene(2)}>
                        Controls
                    </Button>
                </div>
                <MainMenuPlayer id={2} src={"../../../public/assets/characters/greenNinja/character-greenNinja.png"}/>
            </div>
        </>
    )
}
