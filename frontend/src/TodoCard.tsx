import {Todo} from "./Types.tsx";

export type DeleteTodoCallback = (id: string) => void;
type TodoCardProps = {
    todo: Todo
    deleteTodo: DeleteTodoCallback
}

export function TodoCard( props: TodoCardProps ) {

    function deleteEntry() {
        if (props.todo.id)
            props.deleteTodo(props.todo.id)
    }

    return (
        <div className="TodoCard">
            <div>{props.todo.id}</div>
            <div>{props.todo.description}</div>
            <div>{props.todo.status}</div>
            <button onClick={deleteEntry}>delete</button>
        </div>
    )
}