
const MyButton = (props) => {
    return(
    <button type="button" onClick={props.onClickEvent} ref={props.useRef}>{props.content}</button>
    )
}

export default MyButton