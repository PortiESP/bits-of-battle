import PlayerSideMenu from "./PlayerSideMenu";
import Canvas from "./Canvas";

const GameScreen = () => {
    return (
        <>
            <PlayerSideMenu teamId={0} />
            <div className="game">
                <Canvas />
            </div>
            <PlayerSideMenu teamId={1} />
        </>
    );
};

export default GameScreen;
