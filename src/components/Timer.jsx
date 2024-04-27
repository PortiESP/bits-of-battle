import "../styles/Timer.css"
import { useEffect, useState } from "react"

export default function Timer() {
    const [time, setTime] = useState(window.saved && window.saved.timer || 0)

    useEffect(() => {
        // Update the timer every second
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1) 
        }, 1000)

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="timer">
            <span className="timer-data">
                {
                    // Format the time as minutes and seconds
                    `${Math.floor(time / 60).toString().padStart(2, "0")}:${Math.floor(time % 60).toString().padStart(2, "0")}`
                }
            </span>
        </div>
    )
}