import "../styles/StartScreen.css"
import weaponSprite from "../../public/assets/weapon-axe.png"

const StartScreen = ({ action }) => {
    return (
        <div className={"container"}>
            <h1 className={"title"}>Bits-Of-Battle</h1>
            <div className={"arcadePanel"}>
                <div className={"gameSprites"}>
                    <img className={"weapon sprite"} src={weaponSprite} alt="Weapon Sprite" />
                </div>
                <button className={"playButton"} onClick={action}>Insert Coin to Play</button>
            </div>
        </div>
    );
};

export default StartScreen;
