import "../../styles/StartScreenMenus/ControlsMenu.css"
import KbdControls from "./controls/KbdControls"
import CONST from "../../../public/js/data/constants.js"
import { useEffect, useState } from "react"
import Button from "../Button.jsx"

function loadControls(player){
    if (window.saved){
        return window.saved.players[player-1].controls
    } else {
        return player === 1 ? CONST.CONTROLS_P1 : CONST.CONTROLS_P2
    }

}

export default function ControlsMenu(props) {

    const [controls1, setControls1] = useState(loadControls(1))
    const [controls2, setControls2] = useState(loadControls(2))

    useEffect(() => {
        console.log(controls1)
        window.customControls1 = controls1
        if (window.saved){
            window.saved.players[0].controls = controls1
        }
    }, [controls1])
    
    useEffect(() => {
        console.log(controls2)
        window.customControls2 = controls2
        if (window.saved){
            window.saved.players[1].controls = controls2
        }
    }, [controls2])

    const resetControls = () => {
        setControls1(CONST.CONTROLS_P1)
        setControls2(CONST.CONTROLS_P2)
    }

    const checkKeys = (key, player, action) => {
        const c1 = Object.values(controls1)
        const c2 = Object.values(controls2)

        if (player === 1) {
            if (c1.includes(key) && controls1[action] !== key) return true
            if (c2.includes(key)) return true
        } else {
            if (c2.includes(key) && controls2[action] !== key) return true
            if (c1.includes(key)) return true
        }
    }



    return <>
        <h1>Controls</h1>
        <div className="ctr-container">
            <KbdControls id={1} controls={controls1} setControls={setControls1} checkKeys={checkKeys}/>
            <KbdControls id={2} controls={controls2} setControls={setControls2} checkKeys={checkKeys}/>
        </div>
        <span className="sub-btn" onClick={resetControls}>Set default configuration</span>
        <div className="ctr-menu-buttons">
            <Button onClick={() => props.setScene(0)}>Back to main menu</Button>
        </div>
    </>
}
