
export default function Stat({ label, value }) {
    return (
        <div className="stat">
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </div>
    )
}