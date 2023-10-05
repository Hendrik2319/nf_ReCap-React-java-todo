import {ChangeEvent, FormEvent, useState} from "react";
import {DEBUG} from "../Types.tsx";

export type AddTodoCallback = (description: string ) => void
type AddTodoProps = {
    addTodo: AddTodoCallback
    closeDialog: () => void
}

export function AddTodo( props: AddTodoProps ) {
    const [description, setDescription] = useState<string>("")
    if (DEBUG) console.debug(`Rendering AddTodo { description:${description} }`)

    function onSubmit( event:FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        if (description.length !== 0) {
            props.addTodo(description)
            closeDialog()
        } else {
            alert("Please enter a description before adding.")
        }
    }

    function onChange( event:ChangeEvent<HTMLInputElement> ) {
        setDescription(event.target.value)
    }

    function closeDialog() {
        props.closeDialog()
        setDescription("")
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                New {"TODO"} entry:<br/>
                <input value={description} onChange={onChange}/>
            </label>
            <br/>
            <button>Add</button>
            <button type="button" onClick={closeDialog}>Cancel</button>
        </form>
    )
}