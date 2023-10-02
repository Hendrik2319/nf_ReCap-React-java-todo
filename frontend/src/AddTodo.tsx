import {ChangeEvent, FormEvent, useState} from "react";

export type AddTodoCallback = (description: string ) => void
type AddTodoProps = {
    addTodo: AddTodoCallback
}

export function AddTodo( props: AddTodoProps ) {
    const [description, setDescription] = useState<string>("")
    console.debug("AddTodo rendered")

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
            New {"TO"+"DO"} entry:
            <input value={description} onChange={onChange}/>
            <button>Add</button>
        </form>
    )
}