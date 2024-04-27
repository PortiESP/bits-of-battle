import Button from "../Button";
import "../../styles/StartScreenMenus/SettingsMenu.css"
import { useEffect, useState } from "react";
import CONST from "../../../public/js/data/constants";

function loadMusicVol(){
    const vol = parseFloat(localStorage.getItem("musicVolume"))
    return vol === 0 || vol ? vol : CONST.DEFAULT_MUSIC_VOLUME
}

function loadSfxVol(){
    const vol = parseFloat(localStorage.getItem("sfxVolume"))
    return vol === 0 || vol ? vol : CONST.DEFAULT_SOUND_VOLUME
}

export default function SettingsMenu(props) {
    const [sfxVolume, setSfxVolume] = useState(loadSfxVol())
    const [musicVolume, setMusicVolume] = useState( loadMusicVol())

    useEffect(() => {
        window.sound.setVolume("sfx", sfxVolume)
        window.sound.setVolume("music", musicVolume)
        localStorage.setItem("sfxVolume", sfxVolume)
        localStorage.setItem("musicVolume", musicVolume)
    }, [sfxVolume, musicVolume])

    return <div className="settings-menu">
        <h1 className={"title"}>Settings</h1>
        <h3>Volume</h3>
        <div className="sett-volume">
            <Slider label="SFX Volume" state={sfxVolume} setState={setSfxVolume} />
            <Slider label="Music Volume" state={musicVolume} setState={setMusicVolume} />
        </div>

        <h3>Controls</h3>
        <div className="sett-controls">
            <Button color="#6e03F5" onClick={() => props.setScene(2_1)}>
                Change Controls
            </Button>        
        </div>
    </div>
}


export function Slider({label, state, setState}){
    return <div className="sett-volume-grp slider">
                <label htmlFor={label}>{label}</label>
                <input type="range" min="0" max="1" step="0.01" value={state} onChange={e => setState(e.target.value)} className={"slider"} id={label} />
                <span className="sett-slider-num">{Math.floor(state*100)}</span> 
            </div>
}