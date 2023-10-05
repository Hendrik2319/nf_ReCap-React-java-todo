import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {DEBUG, Todo, TodoCallback} from "../Types.tsx";

type Props = {
    selectedEntry: Todo
    saveChanges: TodoCallback
    closeDialog: ()=>void
}

export function EditTodoForm( props:Props ) {
    const [selectedEntry, updateEntry] = useState<Todo>(props.selectedEntry)
    useEffect(
        ()=> updateEntry(props.selectedEntry),
        [ props.selectedEntry ]
    )
    if (DEBUG) console.debug(`Rendering EditTodoForm { id:"${props.selectedEntry.id}" }`)

    function updateEntryValue( name:string, value:string ) {
        updateEntry( {
            ...selectedEntry,
            [name]: value
        } )
    }

    function onChangeFcnI( event: ChangeEvent<HTMLInputElement> ) {
        updateEntryValue( event.target.name, event.target.value )
    }

    function onChangeFcnS( event: ChangeEvent<HTMLSelectElement> ) {
        updateEntryValue( event.target.name, event.target.value )
    }

    function saveChanges( event: FormEvent<HTMLFormElement> ) {
        event.preventDefault()
        props.saveChanges(selectedEntry)
        props.closeDialog()
    }

    return (
        <form className="EditTodoForm" onSubmit={saveChanges}>
            <label>id          : {selectedEntry.id         }</label>
            <label>description : <input  name="description" value={selectedEntry.description} onChange={onChangeFcnI}/></label>
            <label>status      : <select name="status"      value={selectedEntry.status     } onChange={onChangeFcnS}>
                <option value="OPEN"       >Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE"       >Done</option>
            </select></label>
            <div>
                <button>Save</button>
                <button type="button" onClick={props.closeDialog}>Cancel</button>
            </div>
        </form>
    )

}