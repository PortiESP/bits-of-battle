import React from "react";
import "./App.css";
import Game from "./components/Game.jsx";

const App = () => {
    return (
        <div className="app">
            <div className="header">
                <h1>Bits-Of-Battle</h1>
            </div>
            <div className="aside"></div>
            <div className="game">
                <Game />
            </div>
            <div className="aside"></div>
        </div>
    );
};

export default App;
