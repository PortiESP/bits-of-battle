import scss from "../styles/StartScreen.module.scss"

const StartScreen = ({action}) => {
    return (
        <div className={scss.container}>
            <h1>Bits-Of-Battle</h1>
            <button onClick={action}>Play</button>
        </div>
    );
};

export default StartScreen