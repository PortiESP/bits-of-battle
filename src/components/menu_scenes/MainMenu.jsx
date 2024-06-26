import weaponSprite from "../../../public/assets/weapons/weapon-axe.png"
import "../../styles/StartScreenMenus/MainMenu.css"
import Button from "../Button"
import MainMenuPlayer from "./main/MainMenuPlayer"

export default function MainMenu(props) {
    return (
        <>
            <h1 className={"title"}>Bits Of Battle</h1>
            <div className="main-wrapper">
                <MainMenuPlayer setScene={props.setScene} id={1} />
                <div className={"arcadePanel"}>
                    <div className={"gameSprites"}>
                        <img className={"weapon sprite"} src={weaponSprite} alt="Weapon Sprite" />
                    </div>
                    <Button color="#ff3333"  onClick={() => props.setShowStartScreen(false)}>
                        {window.paused ? "Resume": "Play"}
                    </Button>
                    <Button color="#4793AF" onClick={() => props.setScene(1)}>
                        How to Play!
                    </Button>
                    <Button color="#3ea325" onClick={() => props.setScene(2)}>
                        Settings
                    </Button>
                    <Button color="#FFB41C" onClick={() => props.setScene(3)}>
                        Credits
                    </Button>
                </div>
                <MainMenuPlayer setScene={props.setScene} id={2} />
            </div>
        </>
    )
}
