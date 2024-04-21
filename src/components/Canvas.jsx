import { useEffect } from "react"

const Game = () => {
    useEffect(() => {
        let scripts = []

        {
            const script = document.createElement("script")
            script.src = "js/data/globals.js"
            script.type = "module"
            script.defer = true
            scripts.push(script)
        }

        {
            const script = document.createElement("script")
            script.src = "js/script.js"
            script.type = "module"
            script.defer = true
            scripts.push(script)
        }

        scripts.forEach((script) => document.body.appendChild(script))

        return () => {
            scripts.forEach((script) => document.body.removeChild(script))
        }
    }, [])

    return (
        <>
            <canvas id="screen"></canvas>
        </>
    )
}

export default Game
