import "../../styles/StartScreenMenus/SmallScreen.css"

export default function SmallScreen() {
    return (
        <div className={"small-screen-container"}>
            <h1 className={"title"}>Bits Of Battle</h1>
            <div className={"small-screen"}>
                <h1>We are not supporting small screens at the moment</h1>
                <h2>Try playing on a larger screen</h2>
                <p>Minimum width: <span className={"underline"}>1360px</span></p>
            </div>
        </div>
    )
}