import "../styles/Stat.css"
import { useEffect, useRef } from "react"

export default function Stat({ team, label, value }) {
    const image = label === "Health" ? "health" : "default"
    const sprite = useRef(null)

    useEffect(() => {
        sprite.current.style.backgroundImage = `url(/assets/menu_ui/progress-${image}.png)`
    }, [])

    return (
        <div className="stat">
            <div className="stat-data">
                <span className="label">{label}</span>
                <span id={`${label.toLowerCase().replace(" ", "-")}-value${team}`} className="value">{value}</span>
            </div>
            <div className="stat-img-container">
                <i id={`${label.toLowerCase().replace(" ", "-")}-img${team}`} className={"sprite pixelated"} ref={sprite}></i>
            </div>
        </div>
    )
}