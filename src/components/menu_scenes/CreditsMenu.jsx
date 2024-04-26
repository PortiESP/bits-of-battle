import "../../styles/StartScreenMenus/Credits.css"
import Button from "../Button"

export default function Credits(props) {
    return (
        <div className="credits">
            <h1>Credits</h1>
            <h3>Developed by</h3>
            <p>Jaime Portillo - <a href="https://github.com/PortiESP">@PortiESP</a></p>
            <p>Diego Sanchez - <a href="https://github.com/CuB1z">@CuB1z</a></p>
            <p>Marcelo Dominguez - <a href="https://github.com/Sa4dUs">@Sa4dUs</a></p>

            <h3>Art & Sound</h3>
            <p>Jaime Portillo - <a href="https://github.com/PortiESP">@PortiESP</a></p>
            <p>Diego Sanchez - <a href="https://github.com/CuB1z">@CuB1z</a></p>
            <p>Pixel Boy (itch.io) - <a href="https://pixel-boy.itch.io/">@pixel-boy</a></p>
            <p>Challenger.aaa (itch.io) - <a href="https://www.instagram.com/challenger.aaa/?hl=fr">@Challenger.aaa</a></p>

            <div className="credits-back">
                <Button color="#ff3333" onClick={() => props.setScene(0)}>Back to main menu</Button>
            </div>
        </div>
    ) 
}
