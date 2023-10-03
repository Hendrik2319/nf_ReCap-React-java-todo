import {Todo} from "./Types.tsx";
import {useNavigate, useParams} from "react-router-dom";
import TodoCard from "./TodoCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

type Props = {
    callIndex: number
}

export default function TodoDetails( props: Props ) {
    const urlParams = useParams()
    const id = urlParams.id
    const [todo, setLoadedTodo] = useState<Todo>()
    const [savedCallIndex, saveCallIndex] = useState<number>(0)
    console.debug("TodoDetails rendered: id:\""+id+"\", callIndex:"+props.callIndex+"|"+savedCallIndex)

    useEffect( loadData, [ props.callIndex, id ])

    const navigate = useNavigate();

    function loadData() {
        console.debug("TodoDetails -> load data")
        axios
            .get('/api/todo/'+id )
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on load data: " + response.status}
                return response.data;
            })
            .then(data => {
                if (data) {
                    console.debug("TodoDetails -> data loaded")
                    console.debug(data)
                    setLoadedTodo(data)
                } else {
                    console.debug("TodoDetails -> no data with id \""+id+"\" found")
                    setLoadedTodo( undefined )
                }
                saveCallIndex(props.callIndex)
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    if (props.callIndex !== savedCallIndex)
        return (
            <>
                --- Loading ---<br/>
                <button onClick={() => {navigate("/")}}>Back</button>
            </>
        )

    if (!todo)
        return (
            <>
                {"Todo"} with id "{id}" not found<br/>
                <button onClick={() => {navigate("/")}}>Back</button>
            </>
        )

    return (
        <>
            <TodoCard todo={todo} hideDetailsBtn={true} hideEditBtn={true}/>
            <button onClick={() => {navigate("/")}}>Back</button>
        </>
    )
}