import {ChangeEvent, FormEvent, useState} from "react";

type AddTodoProps = {
    addTodo: ( description: string ) => void
}

export default function AddTodo( props: AddTodoProps ) {
    const [description, setDescription] = useState<string>("")
    console.debug("AddTodo rendered")

    function onSubmit( event:FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        props.addTodo(description)
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