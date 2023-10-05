import {IdCallback, Todo} from "../Types.tsx";
import {TodoDetailsOptions} from "./TodoDetails.tsx";
import {EditTodoOptions} from "./EditTodo.tsx";

type TodoCardProps = {
    todo: Todo
    deleteTodo?: IdCallback
    advanceTodo?: IdCallback
    showDetailsDialog?: (options: TodoDetailsOptions) => void
    showEditDialog?: (options: EditTodoOptions) => void
    hideStatus?: boolean
    noBox?: boolean
}

export default function TodoCard( props: TodoCardProps ) {

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

    function showEditDialog() {
        if (props.showEditDialog && props.todo.id)
            props.showEditDialog({ id:props.todo.id })
    }

    return (
        <div className={"TodoCard"+(props.noBox ? "" : " Box")}>
            <div className="Id">id: {props.todo.id}</div>
            <div className="Description">{props.todo.description}</div>
            {!props.hideStatus        && <div className="Status">{props.todo.status}</div>}
            { props.showDetailsDialog && <button onClick={showDetailsDialog}>details</button>}
            { props.showEditDialog    && <button onClick={showEditDialog}>edit</button>}
            { props. deleteTodo       && <button className="DeleteBtn"  onClick={ deleteEntry}>delete</button>}
            { props.advanceTodo       && <button className="AdvanceBtn" onClick={advanceEntry}>advance</button>}
        </div>
    )
}