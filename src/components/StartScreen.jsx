import scss from "../styles/StartScreen.module.scss";
import weaponSprite from "../../public/assets/weapon-axe.png";

const StartScreen = ({ action }) => {
    return (
        <div className={scss.container}>
            <h1 className={scss.title}>Bits-Of-Battle</h1>
            <div className={scss.arcadePanel}>
                <div className={scss.gameSprites}>
                    <img className={scss.weapon} src={weaponSprite} alt="Weapon Sprite" />
                </div>
                <button className={scss.playButton} onClick={action}>Insert Coin to Play</button>
            </div>
        </div>
    );
};

export default StartScreen;
