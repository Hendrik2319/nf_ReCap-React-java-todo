import {ChangeEvent, FormEvent, useState} from "react";
import {DEBUG} from "./Types.tsx";

export type AddTodoCallback = (description: string ) => void
type AddTodoProps = {
    addTodo: AddTodoCallback
}

export function AddTodo( props: AddTodoProps ) {
    const [description, setDescription] = useState<string>("")
    if (DEBUG) console.debug(`Rendering AddTodo { description:${description} }`)

    function onSubmit( event:FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        if (description.length !== 0) {
            props.addTodo(description)
            setDescription("")
        } else {
            alert("Please enter a description before adding.")
        }
    }

    function onChange( event:ChangeEvent<HTMLInputElement> ) {
        setDescription(event.target.value)
    }

    return (
        <form className="AddTodo" onSubmit={onSubmit}>
            New {"TODO"} entry:
            <input value={description} onChange={onChange}/>
            <button>Add</button>
        </form>
    )
}