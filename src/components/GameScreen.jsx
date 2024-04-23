import PlayerSideMenu from "./PlayerSideMenu"
import Canvas from "./Canvas"

const GameScreen = () => {
    return (
        <>
            <PlayerSideMenu name={"Player 1"} id={"1"} />
            <div className="game">
                <Canvas />
            </div>
            <PlayerSideMenu name={"Player 2"} id={"2"} />
        </>
    );
};

export default GameScreen;
