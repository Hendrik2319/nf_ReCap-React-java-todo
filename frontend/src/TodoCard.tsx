import {Todo} from "./Types.tsx";

type TodoCardProps = {
    todo: Todo
    deleteTodo: ( id:string ) => void
}

export default function TodoCard( props: TodoCardProps ) {

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