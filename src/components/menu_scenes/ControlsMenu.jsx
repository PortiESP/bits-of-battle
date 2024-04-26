import "../../styles/StartScreenMenus/ControlsMenu.css"
import KbdControls from "./controls/KbdControls"
import CONST from "../../../public/js/data/constants.js"
import { useEffect, useState } from "react"
import Button from "../Button.jsx"

export default function ControlsMenu(props) {

    const [controls1, setControls1] = useState(CONST.CONTROLS_P1)
    const [controls2, setControls2] = useState(CONST.CONTROLS_P2)

    useEffect(() => {
        console.log(controls1)
        window.customControls1 = controls1
    }, [controls1])
    
    useEffect(() => {
        console.log(controls2)
        window.customControls2 = controls2
    }, [controls2])

    const resetControls = () => {
        setControls1(CONST.CONTROLS_P1)
        setControls2(CONST.CONTROLS_P2)
    }



    return <>
        <h1>Controls</h1>
        <div className="ctr-container">
            <KbdControls id={1} controls={controls1} setControls={setControls1}/>
            <KbdControls id={2} controls={controls2} setControls={setControls2}/>
        </div>
        <span className="sub-btn" onClick={resetControls}>Set default configuration</span>
        <div className="ctr-menu-buttons">
            <Button onClick={() => props.setScene(0)}>Back to main menu</Button>
        </div>
    </>
}
