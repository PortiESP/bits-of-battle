import "../../styles/StartScreenMenus/HowToPlayMenu.css"
import Button from "../Button"

export default function HowToPlayMenu(props) {

    return <div className="how-wrapper">
        <div className="how-container">
            <h1>How To Play</h1>
            <section>
                <h3>Objective</h3>
                <p>Defeat your opponent by hitting them with your weapon.</p>
            </section>
            <section>
                <h3>Controls</h3>
                <p>Player 1: W, A, S, D</p>
                <p>Player 2: Arrow keys</p>
                <p>This ones are the default controls, you can change them in the controls menu.</p>
                <Button color="#3ea325" onClick={() => props.setScene(2_1)}>Go to controls menu</Button>
            </section>
            <section>
                <h3>Gameplay</h3>
                <p>Move your character with the controls and hit your opponent with your weapon.</p>
                <p>Each player has 3 lives, the first player to lose all their lives loses the match.</p>
            </section>
            <section>
                <h3>Powerups</h3>
                <p>Powerups will spawn randomly in the map, pick them up to gain an advantage.</p>
                <p>Powerups include:</p>
                <ul>
                    <li>Speed boost: bla bla bla</li>
                    <li>Extra life: bla bla bla</li>
                    <li>Weapon upgrade: bla bla bla</li>
                </ul>
            </section>
        </div>
        <div className="how-back">
            <Button color="#ff3333" onClick={() => props.setScene(0)}>Back to main menu</Button>
        </div>
    </div>
}