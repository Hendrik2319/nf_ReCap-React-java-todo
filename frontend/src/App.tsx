import './App.css'
import './FloatingDialogs.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {DEBUG, Todo, TodoStatus} from "./Types.tsx";
import TodoList from "./components/TodoList.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {EditTodo} from "./components/EditTodo.tsx";
import TodoDetails from "./components/TodoDetails.tsx";

export default function App() {
    const [reload, setReload] = useState<boolean>(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    if (DEBUG) console.debug(`Rendering App { todoList: ${todoList.length} TODO entries }`)

    useEffect( loadData, [ reload ] )

    function loadData() {
        axios
            .get('/api/todo')
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on load data: " + response.status}
                return response.data;
            })
            .then(data => {
                if (DEBUG) {
                    console.debug("App -> data loaded")
                    console.debug(data)
                }
                setTodoList(data)
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    function addTodo( description: string ) {
        const newTodo: Todo = {
            description: description,
            status: "OPEN"
        }
        axios
            .post('/api/todo', newTodo)
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on load data: " + response.status}
                return response.data;
            })
            .then(data => {
                if (DEBUG) {
                    console.debug("App -> new Todo added")
                    console.debug(data)
                }
                setTodoList([ ...todoList, data ]);
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    function deleteTodo( id:string ) {
        axios
            .delete('/api/todo/'+id)
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on delete entry: " + response.status}
                setReload( !reload )
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    function getNextStatus( status:TodoStatus ): TodoStatus | undefined {
        switch (status) {
            case "OPEN"       : return "IN_PROGRESS"
            case "IN_PROGRESS": return "DONE"
            default: return undefined
        }
    }

    function advanceTodo( id:string ) {
        const filteredTodos = todoList.filter(e => e.id === id);
        if (filteredTodos.length < 1) return

        const todo: Todo = filteredTodos[0]
        const nextStatus = getNextStatus(todo.status);
        if (!nextStatus) return

        const advancedTodo: Todo = {
            ...todo,
            status: nextStatus
        }

        axios
            .put('/api/todo/'+todo.id, advancedTodo )
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on advance entry: " + response.status}
                setReload( !reload )
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    function updateTodo( todo:Todo ) {
        axios
            .put('/api/todo/'+todo.id, todo )
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on update entry: " + response.status}
                setReload( !reload )
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    function showDialog( visible:boolean ) {
        const dialog1 = document.querySelector('#dialog1')
        if (dialog1) {
            if (visible)
                dialog1.classList.add('visible')
            else
                dialog1.classList.remove('visible')
        }
    }

    return (
        <>
            <h1>{"Todo"} List</h1>
            <button onClick={() => showDialog(true)}>Show Dialog</button>
            <div id="dialog1" className="DialogBackground">
                <div className="Dialog">
                    <button onClick={() => showDialog(false)}>close</button>
                </div>
            </div>
            <Routes>
                <Route path="/"
                       element={
                            <TodoList
                                todoList={todoList}
                                addTodo={addTodo}
                                deleteTodo={deleteTodo}
                                advanceTodo={advanceTodo}
                            />
                        }
                />
                <Route path="/edit/:id"
                       element={
                            <EditTodo
                                todoList={todoList}
                                saveChanges={updateTodo}
                            />
                        }
                />
                <Route path="/details/:id"
                       element={
                           <TodoDetails/>
                       }
                />
                <Route path={"/*"} element={<Navigate to={"/"}/>}/>
            </Routes>
        </>
    )
}
