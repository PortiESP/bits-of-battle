import { useEffect, useState } from "react"
import "../styles/button.css"

const colorToDarker = color => {
    if (color === undefined) return undefined
    let r = parseInt(color.slice(1, 3), 16)
    let g = parseInt(color.slice(3, 5), 16)
    let b = parseInt(color.slice(5, 7), 16)
    r = Math.floor(r * 0.6)
    g = Math.floor(g * 0.6)
    b = Math.floor(b * 0.6)
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

/**
 *  Button component
 * 
 * @param {Object} props
 * 
 * @param {Boolean} props.disabled - If the button is disabled (optional)
 * 
 * COLOR PROPS
 * @param {Boolean} props.accept - If the button is an accept button (optional)
 * @param {Boolean} props.cancel - If the button is a cancel button (optional)
 * @param {String} props.color - The color of the button (optional)
 * 
 */
export default function Button(props) {

    const [disabled, setDisabled] = useState(props.disabled || false)

    let type = undefined
    if (props.accept) type = "accept"
    else if (props.cancel) type = "cancel"
    else type = "default"

    if (props.color) type = "custom"

    const customStyle = {
        "--color": props.color,
        "--shadow": colorToDarker(props.color)     
    }

    const handleClick = () => {
        if (!disabled) props.onClick()
    }
    
    useEffect(() => {
        setDisabled(props.disabled)
    }, [props.disabled])

    return <button className={`btn btn-${type} flag-${ disabled ? "disabled" : "enabled"}`} style={customStyle} onClick={handleClick}>{props.children}</button>
}