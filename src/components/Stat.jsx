import "../styles/Stat.css"

export default function Stat({ team, label, value }) {
    return (
        <div className="stat">
            <span className="label">{label}</span>
            <span id={`${label.toLowerCase().replace(" ", "-")}-value${team}`} className="value">{value}</span>
        </div>
    )
}