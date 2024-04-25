import "../../styles/StartScreenMenus/ControlsMenu.css"
import KbdControls from "./controls/KbdControls"
import CONST from "../../../public/js/data/constants.js"
import { useState } from "react"

export default function ControlsMenu(props) {

    const [controls1, setControls1] = useState(CONST.CONTROLS_P1)
    const [controls2, setControls2] = useState(CONST.CONTROLS_P2)

    return <>
        <h1>Controls</h1>
        <div className="ctr-container">
            <KbdControls id={1} controls={controls1} setControls={setControls1}/>
            <KbdControls id={2} controls={controls2} setControls={setControls2}/>
        </div>
    </>
}
