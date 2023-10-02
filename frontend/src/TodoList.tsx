import {Todo, TodoStatus} from "./Types.tsx";
import {DeleteTodoCallback, TodoCard} from "./TodoCard.tsx";
import {AddTodo, AddTodoCallback} from "./AddTodo.tsx";

type TodoListProps = {
    todoList: Todo[]
    addTodo: AddTodoCallback
    deleteTodo: DeleteTodoCallback
}

export default function TodoList( props: TodoListProps ) {

    function generateCards( status:TodoStatus ) {
        return props.todoList
            .filter( e => e.status === status)
            .map( (e: Todo) =>
                <TodoCard
                    key={e.id}
                    todo={e}
                    deleteTodo={props.deleteTodo}
                />
            )
    }

    return (
        <>
            <AddTodo addTodo={props.addTodo}/>
            <div className="AllTodoLists">
                <div className="CardGroupContainer">Open  <div className="CardGroup">{generateCards("OPEN"       )}</div></div>
                <div className="CardGroupContainer">Doing <div className="CardGroup">{generateCards("IN_PROGRESS")}</div></div>
                <div className="CardGroupContainer">Done  <div className="CardGroup">{generateCards("DONE"       )}</div></div>
            </div>
        </>
    )

}