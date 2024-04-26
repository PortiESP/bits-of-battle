import { useEffect, useState } from "react"
import Button from "../../Button"

const KEYS_DICT = {
    "arrowup": "↑",
    "arrowleft": "←",
    "arrowdown": "↓",
    "arrowright": "→",
    " ": "Space",
    "control": "Ctrl",
    "shiftleft": "ShiftL",
    "shiftright": "ShiftR",
    "alt": "Alt",
    "escape": "Esc",
    "enter": "Enter",
    "backspace": "Backspace",
    "tab": "Tab",
    "delete": "Del",
    "insert": "Ins",
    "home": "Home",
    "end": "End",
    "pageup": "PgUp",
    "pagedown": "PgDn",
    "capslock": "Caps",
    "numlock": "Num",
    "scrolllock": "Scroll",
    "pause": "Pause",
    "printscreen": "PrtSc",
    "meta": "Win",
    "f1": "F1",
    "f2": "F2",
    "f3": "F3",
    "f4": "F4",
    "f5": "F5",
    "f6": "F6",
    "f7": "F7",
    "f8": "F8",
    "f9": "F9",
    "f10": "F10",
    "f11": "F11",
    "f12": "F12",
    "f13": "F13",
    "f14": "F14",
    "f15": "F15",
    "f16": "F16",
    "f17": "F17",
    "f18": "F18",
    "f19": "F19",
    "f20": "F20",
    "f21": "F21",
    "f22": "F22",
    "f23": "F23",
    "f24": "F24",
    "audiovolumedown": "Vol-",
    "audiovolumeup": "Vol+",
    "audiomute": "Mute",
    "audiovolumemute": "Mute",
    "mediastop": "Stop",
    "mediaplaypause": "Play/Pause",
    "medianexttrack": "Next",
    "mediaprevioustrack": "Prev",
    "audiovolumedown": "Vol-",
    "intlbackslash": "<",
    "controlleft": "CtrlL",
    "controlright": "CtrlR",
    "backquote": "º",
}

const translateKey = (key) => {
    if (key.length === 1) return key.toUpperCase()
    if (key.startsWith("key")) return key.slice(3).toUpperCase()
    if (key.startsWith("digit")) return key.slice(5)
    if (key.startsWith("numpad")) return "NP" + key.slice(6)
    return KEYS_DICT[key] || key
}

export default function KbdControls(props) {

    const [showKeyPopup, setShowKeyPopup] = useState(false)
    const [keyPressed, setKeyPressed] = useState("")

    const handleKeyEvent = (e) => {
        console.log(e.code.toLowerCase())
        setKeyPressed(e.code.toLowerCase())
    }

    const acceptChange = () => {
        setShowKeyPopup(false)
        props.setControls(old => ({...old, [showKeyPopup]: keyPressed}))
    }

    const triggerKeyPopup = (action) => {
        setKeyPressed(props.controls[action])
        setShowKeyPopup(action)
    }

    const checkValidKey = () => {
        const key = keyPressed 
        const action = showKeyPopup  // "up", "left", "down", "right", "attack"

        // Own player
        for (let a in props.controls) {
            if (a === action) continue
            if (props.controls[a] === key) return false
        }


        return true
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyEvent)
        return () => window.removeEventListener("keydown", handleKeyEvent)
    }, [])

    return <div className={"ctr-player"}>
        <h2>Player {props.id}</h2>
        <div className="ctr-grid">
            {
                ["up", "left", "down", "right", "attack"].map(action => {
                    return <div key={action} className={`ctr-key-group ctr-key-${action}`} onClick={()=> triggerKeyPopup(action)}>
                        <div className={`ctr-key ${translateKey(props.controls[action]).length > 4 ? "large": "small"}`}>{translateKey(props.controls[action])}</div>
                        <div className="ctr-action">{action[0].toUpperCase() + action.slice(1)}</div>
                    </div>
                
                })
            }
        </div>
        {
            showKeyPopup && <div className="ctr-popup" >
                <div className="ctr-popup-content" >
                    <h3>Press a key for the "{showKeyPopup}" action</h3>
                    <span className="ctr-key-span">{translateKey(keyPressed) || "-"}</span>
                    {
                        checkValidKey() || <span className="ctr-key-span-invalid">Warning: This key is already in use</span>
                    }
                    <div className="ctr-popup-buttons">
                        <Button cancel onClick={() => setShowKeyPopup(false)}>Cancel</Button>
                        <Button accept onClick={() => {setShowKeyPopup(false); acceptChange()}}>Accept</Button>
                    </div>
                </div>
            </div>
        }
    </div>
}