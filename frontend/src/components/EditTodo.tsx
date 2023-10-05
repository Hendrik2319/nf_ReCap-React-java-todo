import {DEBUG, Todo, TodoCallback} from "../Types.tsx";
import {EditTodoForm} from "./EditTodoForm.tsx";
import {useState} from "react";

export type EditTodoOptions = {
    id: string
}

type EditTodoProps = {
    todoList: Todo[]
    saveChanges: TodoCallback
    closeDialog: ()=>void
    setInitFuntion: ( initFunction: (options:EditTodoOptions)=> void ) => void
}

export function EditTodo(props:EditTodoProps ) {
    const [id, setId] = useState<string>("")
    if (DEBUG) console.debug(`Rendering EditTodo { id:${id}, props.todoList: ${props.todoList.length} TODO entries }`)
    props.setInitFuntion((options: EditTodoOptions) => setId(options.id))

    const filteredTodos:Todo[] = props.todoList.filter(e => e.id === id)

    return (
        filteredTodos.length < 1 ? <>Can't find entry with id "{id}"</> :
            <EditTodoForm selectedEntry={filteredTodos[0]} saveChanges={props.saveChanges} closeDialog={props.closeDialog}/>
    )
}
