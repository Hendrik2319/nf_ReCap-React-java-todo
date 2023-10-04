import {DEBUG, Todo} from "../Types.tsx";
import {useNavigate, useParams} from "react-router-dom";
import TodoCard from "./TodoCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function TodoDetails() {
    const urlParams = useParams()
    const id = urlParams.id
    const [wasLoaded, setLoaded] = useState<boolean>(false)
    const [todo, setLoadedTodo] = useState<Todo>()
    if (DEBUG) console.debug(`Rendering TodoDetails { id:"${id}", wasLoaded:${wasLoaded}, todo:${todo ? '###' : '--'} }`)

    useEffect( loadData, [id])

    const navigate = useNavigate();

    function loadData() {
        if (DEBUG) console.debug("TodoDetails -> load data")
        axios
            .get('/api/todo/'+id )
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on load data: " + response.status}
                return response.data;
            })
            .then(data => {
                if (data) {
                    if (DEBUG) {
                        console.debug("TodoDetails -> data loaded")
                        console.debug(data)
                    }
                    setLoadedTodo(data)
                } else {
                    if (DEBUG) console.debug("TodoDetails -> no data with id \""+id+"\" found")
                    setLoadedTodo( undefined )
                }
                setLoaded(true)
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    return (
        <>
            {
                !wasLoaded ? <>--- Loading ---<br/></> :
                    !todo ? <>{"Todo"} with id "{id}" not found<br/></> :
                        <TodoCard todo={todo} hideDetailsBtn={true} hideEditBtn={true}/>
            }
            <button onClick={() => {navigate("/")}}>Back</button>
        </>
    )
}