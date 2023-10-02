import {IdCallback, Todo} from "./Types.tsx";
import {useNavigate} from "react-router-dom";

type TodoCardProps = {
    todo: Todo
    deleteTodo?: IdCallback
    advanceTodo?: IdCallback
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
            <div>{props.todo.id}</div>
            <div>{props.todo.description}</div>
            <div>{props.todo.status}</div>
            <button onClick={() => navigate("/edit/"+props.todo.id)}>edit</button>
            {props. deleteTodo && <button onClick={ deleteEntry}>delete</button>}
            {props.advanceTodo && <button onClick={advanceEntry}>advance</button>}
        </div>
    )
}