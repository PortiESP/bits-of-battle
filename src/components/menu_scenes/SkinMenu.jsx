import Button from "../Button"

export default function SkinMenu(props) {
    return (
        <>
            <h1 className={"title"}>Bits Of Battle</h1>
            <div className="main-wrapper">
                <div className={"arcadePanel"}>
                    <h2>Choose your skin</h2>
                    <div className={"skins"}>
                        <div className={"skin"}>
                            <span>Blue Ninja</span>
                        </div>
                        <div className={"skin"}>
                            <span>Green Ninja</span>
                        </div>
                        <div className={"skin"}>
                            <span>Red Ninja</span>
                        </div>
                        <div className={"skin"}>
                            <span>Yellow Ninja</span>
                        </div>
                    </div>
                    <Button color="#ff3333" onClick={() => props.setScene(0)}>
                        Back
                    </Button>
                </div>
            </div>
        </>
    )
}