import axios from "axios";
import {DEBUG, Todo} from "../Types.tsx";

export type SetTodoListFunction = (todoList: Todo[]) => void;
export type AddTodoFunction = (todo: Todo) => void;
export type ReloadFunction = () => void;

export type ApiService = {
    getAll: () => void
    add   : ( savedTodo:Todo ) => void
    delete: ( id:string ) => void
    update: ( todo:Todo ) => void
}

export function createApiService(
    callerLabel: string,
    setTodoList: SetTodoListFunction,
    addTodo: AddTodoFunction,
    reload: ReloadFunction
) :ApiService {

    function getAll() {
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

    function add( todo:Todo ) {
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

    function delete_( id:string ) {
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

    function update( todo:Todo ) {
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

    return {
        getAll,
        add,
        delete: delete_,
        update,
    }
}
