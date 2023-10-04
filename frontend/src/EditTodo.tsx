import {DEBUG, Todo, TodoCallback} from "./Types.tsx";
import {useParams} from "react-router-dom";
import {EditTodoForm} from "./EditTodoForm.tsx";

type EditTodoProps = {
    todoList: Todo[]
    saveChanges: TodoCallback
}

export function EditTodo( props:EditTodoProps ) {
    const urlParams = useParams()
    const id = urlParams.id
    if (DEBUG) console.debug(`Rendering EditTodo { id:"${id}", props.todoList: ${props.todoList.length} TODO entries }`)

    const filteredTodos:Todo[] = props.todoList.filter(e => e.id === id)

    return (
        filteredTodos.length < 1 ? <>Can't find entry with id "{id}"</> :
            <EditTodoForm selectedEntry={filteredTodos[0]} saveChanges={props.saveChanges}/>
    )
}