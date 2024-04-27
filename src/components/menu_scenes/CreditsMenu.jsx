import "../../styles/StartScreenMenus/Credits.css"
import Button from "../Button"

export default function Credits(props) {
    return (
        <div className="credits">
            <h1>Credits</h1>
            <h3>Developed by</h3>
            <p>Jaime Portillo - <a href="https://github.com/PortiESP">@PortiESP</a></p>
            <p>Diego Sánchez - <a href="https://github.com/CuB1z">@CuB1z</a></p>
            <p>Marcelo Domínguez - <a href="https://github.com/Sa4dUs">@Sa4dUs</a></p>

            <h3>Art & Sound</h3>
            <p>Jaime Portillo - <a href="https://github.com/PortiESP">@PortiESP</a></p>
            <p>Diego Sánchez - <a href="https://github.com/CuB1z">@CuB1z</a></p>

            <h3>Special Thanks</h3>
            <p>Alexis de Chazelles - <a href="https://pixel-boy.itch.io/">@pixel-boy</a>
            <span>For the amazing pixel art assets and sound effects</span>
            </p>

            <div className="credits-back">
                <Button color="#ff3333" onClick={() => props.setScene(0)}>Back to main menu</Button>
            </div>
        </div>
    ) 
}
