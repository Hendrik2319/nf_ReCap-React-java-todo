import {Todo} from "./Types.tsx";

type TodoCardProps = {
    todo: Todo
}

export default function TodoCard( props: TodoCardProps ) {

    return (
        <div className="TodoCard">
            <div>{props.todo.id}</div>
            <div>{props.todo.description}</div>
            <div>{props.todo.status}</div>
        </div>
    )
}