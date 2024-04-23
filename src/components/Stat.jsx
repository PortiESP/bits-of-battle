
import { useEffect } from "react"
import CONST from "../../public/js/data/constants"

export default function Stat({ label, value }) {
    useEffect(() => {
        console.log(`Stat component rendered with label: ${label} and value: ${value}`)
    }, [label, value])

    return (
        <div className="stat">
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </div>
    )
}