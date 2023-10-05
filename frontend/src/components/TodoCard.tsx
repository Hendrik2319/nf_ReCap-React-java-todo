import {IdCallback, Todo} from "../Types.tsx";
import {useNavigate} from "react-router-dom";
import {TodoDetailsOptions} from "./TodoDetails.tsx";

type TodoCardProps = {
    todo: Todo
    deleteTodo?: IdCallback
    advanceTodo?: IdCallback
    showDetailsDialog?: (options: TodoDetailsOptions) => void
    hideEditBtn?: boolean
    hideStatus?: boolean
    noBox?: boolean
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

    function showDetailsDialog() {
        if (props.showDetailsDialog && props.todo.id)
            props.showDetailsDialog({ id:props.todo.id })
    }

    return (
        <div className={"TodoCard"+(props.noBox ? "" : " Box")}>
            <div className="Id">id: {props.todo.id}</div>
            <div className="Description">{props.todo.description}</div>
            {!props.hideStatus        && <div className="Status">{props.todo.status}</div>}
            { props.showDetailsDialog && <button onClick={showDetailsDialog}>details</button>}
            {!props.hideEditBtn       && <button onClick={() => navigate("/edit/" + props.todo.id)}>edit</button>}
            { props. deleteTodo       && <button className="DeleteBtn"  onClick={ deleteEntry}>delete</button>}
            { props.advanceTodo       && <button className="AdvanceBtn" onClick={advanceEntry}>advance</button>}
        </div>
    )
}