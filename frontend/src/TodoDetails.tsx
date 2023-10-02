import {Todo} from "./Types.tsx";
import {useNavigate, useParams} from "react-router-dom";
import TodoCard from "./TodoCard.tsx";

type Props = {
    todoList: Todo[]
}

export default function TodoDetails( props: Props ) {
    const urlParams = useParams()
    const id = urlParams.id
    console.debug("TodoDetails rendered: "+props.todoList.length+" TODO entries / id:\""+id+"\"")

    const navigate = useNavigate();

    const filteredTodos:Todo[] = props.todoList.filter(e => e.id === id)
    if (filteredTodos.length < 1)
        return (<>Can't find entry with id "{id}"</>)

    const entry: Todo = filteredTodos[0]

    return (
        <>
            <TodoCard todo={entry} hideDetailsBtn={true} hideEditBtn={true}/>
            <button onClick={() => {navigate("/")}}>Back</button>
        </>
    )
}