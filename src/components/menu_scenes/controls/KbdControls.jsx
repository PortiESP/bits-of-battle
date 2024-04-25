import { useState } from "react"

export default function KbdControls(props) {

    const [showKeyPopup, setShowKeyPopup] = useState(false)
    const [keyPressed, setKeyPressed] = useState(undefined)

    const handleKeyEvent = (e) => {
        e.preventDefault()
        setKeyPressed(e.key)
    }

    return <div className={"ctr-player"}>
        <h2>Player {props.id}</h2>
        <div className="ctr-grid">
            <div className="ctr-key-group ctr-key-up" onClick={()=> setShowKeyPopup("up")}>
                <div className="ctr-key">W</div>
                <div className="ctr-action">Up</div>
            </div>
            <div className="ctr-key-group ctr-key-left" onClick={()=> setShowKeyPopup("left")}>
                <div className="ctr-key">A</div>
                <div className="ctr-action">Left</div>
            </div>
            <div className="ctr-key-group ctr-key-down" onClick={()=> setShowKeyPopup("down")}>
                <div className="ctr-key">S</div>
                <div className="ctr-action">Down</div>
            </div>
            <div className="ctr-key-group ctr-key-right" onClick={()=> setShowKeyPopup("right")}>
                <div className="ctr-key">D</div>
                <div className="ctr-action">Right</div>
            </div>
            <div className="ctr-key-group ctr-key-attack" onClick={()=> setShowKeyPopup("attack")}>
                <div className="ctr-key">Space</div>
                <div className="ctr-action">Shoot</div>
            </div>
        </div>
        {
            showKeyPopup && <div className="ctr-popup">
                <div className="ctr-popup-content" onKeyDown={handleKeyEvent}>
                    <h3>Press a key to for the "{showKeyPopup}" action</h3>
                    <div>{keyPressed || "-"}</div>
                    <button onClick={() => {setShowKeyPopup(false); props.setControls(old => ({...old, showKeyPopup: keyPressed}))}}>Accept</button>
                    <button onClick={() => setShowKeyPopup(false)}>Cancel</button>
                </div>
            </div>
        }
    </div>
}