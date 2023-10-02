import {Todo} from "./Types.tsx";
import {useParams} from "react-router-dom";
import {EditTodoForm, SaveEditChangesCallback as SaveEditChangesCallback_ } from "./EditTodoForm.tsx";

export type SaveEditChangesCallback = SaveEditChangesCallback_;
type EditTodoProps = {
    todoList: Todo[]
    saveChanges: SaveEditChangesCallback
}

export function EditTodo( props:EditTodoProps ) {
    const urlParams = useParams()
    const id = urlParams.id
    console.debug("EditTodo rendered: "+props.todoList.length+" TODO entries / id:\""+id+"\"")

    const filteredTodos:Todo[] = props.todoList.filter(e => e.id === id)
    if (filteredTodos.length < 1)
        return (<>Can't find entry with id "{id}"</>)

    const entry: Todo = filteredTodos[0]

    return (
        <EditTodoForm selectedEntry={entry} saveChanges={props.saveChanges}/>
    )
}