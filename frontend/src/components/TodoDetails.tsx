import {DEBUG, Todo} from "../Types.tsx";
import TodoCard from "./TodoCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

export type TodoDetailsOptions = {
    id: string
}

type Props = {
    closeDialog: ()=>void
    setInitFuntion: ( initFunction: (options:TodoDetailsOptions)=> void ) => void
}

export function TodoDetailsWrapper( props: Props ) {
    const [id, setId] = useState<string>("")
    if (DEBUG) console.debug(`Rendering TodoDetailsWrapper { id:${id} }`)
    props.setInitFuntion((options: TodoDetailsOptions) => setId(options.id))

    return (
        <>
            {id ? <TodoDetails id={id}/> : <>No ID specified.</>}
            <button onClick={props.closeDialog}>Close</button>
        </>
    )
}

function TodoDetails( props: TodoDetailsOptions ) {
    const [wasLoaded, setLoaded] = useState<boolean>(false)
    const [todo, setLoadedTodo] = useState<Todo>()
    if (DEBUG) console.debug(`Rendering TodoDetails { id:"${props.id}", wasLoaded:${wasLoaded}, todo:${todo ? '###' : '--'} }`)

    useEffect( loadData, [props.id])

    function loadData() {
        if (DEBUG) console.debug("TodoDetails -> load data")
        axios
            .get('/api/todo/'+props.id )
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
                    if (DEBUG) console.debug("TodoDetails -> no data with id \""+props.id+"\" found")
                    setLoadedTodo( undefined )
                }
                setLoaded(true)
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    return (
        !wasLoaded ? <>--- Loading ---<br/></> :
            !todo ? <>{"Todo"} with id "{props.id}" not found<br/></> :
                <TodoCard todo={todo} noBox={true}/>
    )
}