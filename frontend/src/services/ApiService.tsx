import axios from "axios";
import {DEBUG, Todo} from "../Types.tsx";

export type SetTodoListFunction = (todoList: Todo[]) => void;
export type AddTodoFunction = (todo: Todo) => void;
export type ReloadFunction = () => void;

export function loadData_(setTodoList: SetTodoListFunction, callerLabel:string) {
    axios
        .get('/api/todo')
        .then(response => {
            if (response.status != 200)
                throw {error: `Got wrong status on load data: ${response.status}`}
            return response.data;
        })
        .then(data => {
            if (DEBUG) {
                console.debug(`${callerLabel} -> data loaded`)
                console.debug(data)
            }
            setTodoList(data)
        })
        .catch(reason => {
            console.error(reason)
        })
}


export function addTodo_( todo:Todo, addTodo: AddTodoFunction, callerLabel:string ) {
    axios
        .post('/api/todo', todo)
        .then(response => {
            if (response.status != 200)
                throw {error: "Got wrong status on load data: " + response.status}
            return response.data;
        })
        .then(data => {
            if (DEBUG) {
                console.debug(`${callerLabel} -> new Todo added`)
                console.debug(data)
            }
            addTodo(data)
        })
        .catch(reason => {
            console.error(reason)
        })
}

export function deleteTodo_( id:string, reload: ReloadFunction ) {
    axios
        .delete('/api/todo/'+id)
        .then(response => {
            if (response.status != 200)
                throw {error: "Got wrong status on delete entry: " + response.status}
            reload()
        })
        .catch(reason => {
            console.error(reason)
        })
}

export function updateTodo_( todo:Todo, reload: ReloadFunction ) {
    axios
        .put('/api/todo/'+todo.id, todo )
        .then(response => {
            if (response.status != 200)
                throw {error: "Got wrong status on update entry: " + response.status}
            reload()
        })
        .catch(reason => {
            console.error(reason)
        })
}
