import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "./Types.tsx";
import TodoCard from "./TodoCard.tsx";
import AddTodo from "./AddTodo.tsx";

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

    function addTodo( description: string ) {
        const newTodo: Todo = {
            id: null,
            description: description,
            status: "OPEN"
        }
        setTodoList([ ...todoList, newTodo ]);
    }

    return (
        <>
            <h1>{"To"+"do"} List</h1>
            <AddTodo addTodo={addTodo}/>
            <div className="ListOfTodoLists">
                <div className="TodoListContainer">
                    Open
                    <div className="TodoList">
                        {todoList.filter( e=> e.status=="OPEN").map( (e: Todo) => <TodoCard todo={e}/>)}
                    </div>
                </div>
                <div className="TodoListContainer">
                    Doing
                    <div className="TodoList">
                        {todoList.filter( e=> e.status=="IN_PROGRESS").map( (e: Todo) => <TodoCard todo={e}/>)}
                    </div>
                </div>
                <div className="TodoListContainer">
                    Done
                    <div className="TodoList">
                        {todoList.filter( e=> e.status=="DONE").map( (e: Todo) => <TodoCard todo={e}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
