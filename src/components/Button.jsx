import "../styles/button.css"

export default function Button(props) {

    let type = undefined
    if (props.accept) type = "accept"
    else if (props.cancel) type = "cancel"
    else type = "default"
    

    return <button className={`btn btn-${type}`} onClick={props.onClick}>{props.children}</button>
}