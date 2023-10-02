import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "./Types.tsx";
import TodoList from "./TodoList.tsx";

export default function App() {
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

    return (
        <>
            <h1>{"Todo"} List</h1>
            <TodoList todoList={todoList} addTodo={addTodo} deleteTodo={deleteTodo}/>
        </>
    )
}
