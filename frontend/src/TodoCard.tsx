import {IdCallback, Todo} from "./Types.tsx";
import {useNavigate} from "react-router-dom";

type TodoCardProps = {
    todo: Todo
    deleteTodo?: IdCallback
    advanceTodo?: IdCallback
    hideDetailsBtn?: boolean
    hideEditBtn?: boolean
    hideStatus?: boolean
}

export default function TodoCard( props: TodoCardProps ) {
    const navigate = useNavigate();

    function deleteEntry() {
        if (props.deleteTodo && props.todo.id)
            props.deleteTodo(props.todo.id)
    }

    function advanceEntry() {
        if (props.advanceTodo && props.todo.id)
            props.advanceTodo(props.todo.id)
    }

    return (
        <div className="TodoCard">
            <div className="Id">id: {props.todo.id}</div>
            <div className="Description">{props.todo.description}</div>
            {!props.hideStatus     && <div className="Status">{props.todo.status}</div>}
            {!props.hideDetailsBtn && <button onClick={() => navigate("/details/" + props.todo.id)}>details</button>}
            {!props.hideEditBtn    && <button onClick={() => navigate("/edit/" + props.todo.id)}>edit</button>}
            {props. deleteTodo && <button className="DeleteBtn"  onClick={ deleteEntry}>delete</button>}
            {props.advanceTodo && <button className="AdvanceBtn" onClick={advanceEntry}>advance</button>}
        </div>
    )
}