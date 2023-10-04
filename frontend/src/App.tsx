import './App.css'
import React, {useEffect, useState} from "react";
import {DEBUG, getNextStatus, Todo} from "./Types.tsx";
import TodoList from "./components/TodoList.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {EditTodo} from "./components/EditTodo.tsx";
import TodoDetails from "./components/TodoDetails.tsx";
import {addTodo_, deleteTodo_, loadData_, updateTodo_} from "./services/ApiService.tsx";

export default function App() {
    const [reloadState, setReloadState] = useState<boolean>(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    if (DEBUG) console.debug(`Rendering App { todoList: ${todoList.length} TODO entries }`)

    useEffect( loadData, [ reloadState ] )

    function loadData() {
        loadData_( setTodoList, 'App' )
    }

    function addTodo( description: string ) {
        const newTodo: Todo = {
            description: description,
            status: "OPEN"
        }
        addTodo_(
            newTodo,
            savedTodo => setTodoList([ ...todoList, savedTodo ]),
            'App'
        )
    }

    function reload() {
        setReloadState(!reloadState);
    }

    function deleteTodo( id:string ) {
        deleteTodo_( id, reload )
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

        updateTodo_( advancedTodo, reload )
    }

    function updateTodo( todo:Todo ) {
        updateTodo_( todo, reload )
    }

    return (
        <>
            <h1>{"Todo"} List</h1>
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
