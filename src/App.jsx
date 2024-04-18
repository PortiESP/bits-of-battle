import "./App.css"
import Canvas from "./components/Canvas.jsx"
import PlayerSideMenu from "./components/PlayerSideMenu.jsx"

const App = () => {
    return (
        <div className="app">
            <PlayerSideMenu teamId={0} />
            <div className="game">
                <Canvas />
            </div>
            <PlayerSideMenu teamId={1} />
        </div>
    )
}

export default App
