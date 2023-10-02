import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Todo, TodoStatus} from "./Types.tsx";
import TodoCard from "./TodoCard.tsx";
import AddTodo from "./AddTodo.tsx";

function App() {
    const [reload, setReload] = useState<boolean>(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    console.debug("App rendered: "+todoList.length+" TODO entries")

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
                console.log("New Todo added")
                console.log(data)
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

    function generateCards( status:TodoStatus ) {
        return todoList
            .filter( e=> e.status === status)
            .map( (e: Todo) =>
                <TodoCard
                    key={e.id}
                    todo={e}
                    deleteTodo={deleteTodo}
                />
            )
    }

    return (
        <>
            <h1>{"To"+"do"} List</h1>
            <AddTodo addTodo={addTodo}/>
            <div className="ListOfTodoLists">
                <div className="TodoListContainer">Open  <div className="TodoList">{generateCards("OPEN"       )}</div></div>
                <div className="TodoListContainer">Doing <div className="TodoList">{generateCards("IN_PROGRESS")}</div></div>
                <div className="TodoListContainer">Done  <div className="TodoList">{generateCards("DONE"       )}</div></div>
            </div>
        </>
    )
}

export default App
