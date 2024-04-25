import "../../../styles/StartScreenMenus/MainMenuPlayer.css"


export default function MainMenuPlayer(props) {

    const style = {
        backgroundImage: `url(${props.src})`,
    }

    return (
        <div className={"main-player"}>
            <div className={"main-sprite-frame"} style={style}></div>
            <span className="main-sprite-title">Player {props.id ||0}</span>
        </div>
    )
}