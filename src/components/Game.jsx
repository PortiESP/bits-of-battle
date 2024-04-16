import { useEffect } from "react";

const Game = () => {
    useEffect(() => {
        let scripts = []

        {
            const script = document.createElement("script");
            script.src = "js/data/data.js";
            script.type = "module";
            scripts.push(script);
        }

        {
            const script = document.createElement("script");
            script.src = "js/script.js";
            script.type = "module";
            scripts.push(script);
        }

        scripts.forEach(script => document.body.appendChild(script));

        return () => {
            scripts.forEach(script => document.body.removeChild(script));
        };
    }, []);

    return (
        <>
            <canvas id="screen"></canvas>
        </>
    );
};

export default Game;
