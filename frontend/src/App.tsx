import './App.css'
import './FloatingDialogs.css'
import React, {useEffect, useState} from "react";
import {DEBUG, getNextStatus, Todo} from "./Types.tsx";
import TodoList from "./components/TodoList.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {EditTodo} from "./components/EditTodo.tsx";
import TodoDetails from "./components/TodoDetails.tsx";
import {ApiService, createApiService} from "./services/ApiService.tsx";

export default function App() {
    const [reloadState, setReloadState] = useState<boolean>(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    if (DEBUG) console.debug(`Rendering App { todoList: ${todoList.length} TODO entries }`)

    const apiService: ApiService = createApiService( 'App',
        setTodoList,
        savedTodo => setTodoList([ ...todoList, savedTodo ]),
        () => setReloadState(!reloadState)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => apiService.getAll(), [ reloadState ] )

    function addTodo( description: string ) {
        apiService.add({
            description: description,
            status: "OPEN"
        })
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

        apiService.update( advancedTodo )
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
                                deleteTodo={apiService.delete}
                                advanceTodo={advanceTodo}
                            />
                        }
                />
                <Route path="/edit/:id"
                       element={
                            <EditTodo
                                todoList={todoList}
                                saveChanges={apiService.update}
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
