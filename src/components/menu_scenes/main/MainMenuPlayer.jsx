import "../../../styles/StartScreenMenus/MainMenuPlayer.css"
import Button from "../../Button"


export default function MainMenuPlayer(props) {

    const style = {
        backgroundImage: `url(${props.src})`,
    }

    return (
        <div className={"main-player"}>
            <div className={"main-sprite-frame"} style={style}></div>
            <span className="main-sprite-title">Player {props.id ||0}</span>
            <Button color="#A79578" onClick={() => props.setScene(3)}>Choose Skin</Button>
        </div>
    )
}