import { useEffect } from "react"
import "../../styles/StartScreenMenus/Credits.css"
import Button from "../Button"

export default function Credits(props) {
    useEffect(() => {
        document.querySelector(".container").classList.add("disabled")
    }, [])

    return (
        <div className="credits">
            <h1>Credits</h1>
            <h3>GitHub Repository</h3>
            <p><a href="https://github.com/PortiESP/bits-of-battle" target="_blank">https://github.com/PortiESP/bits-of-battle</a></p>

            <h3>Developed by</h3>
            <p>Jaime Portillo - <a href="https://github.com/PortiESP" target="_blank">@PortiESP</a></p>
            <p>Diego Sánchez - <a href="https://github.com/CuB1z" target="_blank">@CuB1z</a></p>
            <p>Marcelo Domínguez - <a href="https://github.com/Sa4dUs" target="_blank">@Sa4dUs</a></p>

            <h3>Art</h3>
            <p>Jaime Portillo - <a href="https://github.com/PortiESP" target="_blank">@PortiESP</a></p>
            <p>Diego Sánchez - <a href="https://github.com/CuB1z" target="_blank">@CuB1z</a></p>

            <h3>Special Thanks</h3>
            <p>Alexis de Chazelles - <a href="https://pixel-boy.itch.io/" target="_blank">@pixel-boy</a>
            <span>For the amazing pixel art assets and sound effects</span>
            </p>

            <div className="credits-back">
                <Button color="#ff3333" onClick={() => {
                    props.setScene(0)
                    document.querySelector(".container").classList.remove("disabled")
                }}>Back to main menu</Button>
            </div>
        </div>
    ) 
}
