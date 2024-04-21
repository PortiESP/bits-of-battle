import { useState } from "react";
import "./App.css";
import GameScreen from "./components/GameScreen.jsx";
import StartScreen from "./components/StartScreen.jsx";

const App = () => {
    const [showStart, setShowStart] = useState(true); 

    return (
        <div className="app">
            {showStart ? 
                <StartScreen action={() => setShowStart(false)}/>
             : 
                <GameScreen/>
            }
        </div>
    );
};

export default App;
