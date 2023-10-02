import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "./Types.tsx";
import TodoCard from "./TodoCard.tsx";

function App() {
    const [todoList, setTodoList] = useState<Todo[]>([])

    useEffect( loadData, [] )

    function loadData() {
        axios
            .get('/api/todo')
            .then(response => {
                if (response.status != 200)
                    throw {error: "Got wrong status on load data: " + response.status}

                return response.data;
            })
            .then(data => {
                console.log("Data loaded")
                console.log(data)
                setTodoList(data)
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    return (
        <>
            <h1>Todo List</h1>
            <div className="TodoList">
                {todoList.map( (e: Todo) => <TodoCard todo={e}/>)}
            </div>
        </>
    )
}

export default App
