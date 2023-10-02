import {IdCallback, Todo, TodoStatus} from "./Types.tsx";
import TodoCard from "./TodoCard.tsx";
import {AddTodo, AddTodoCallback} from "./AddTodo.tsx";

type TodoListProps = {
    todoList: Todo[]
    addTodo: AddTodoCallback
    deleteTodo: IdCallback
    advanceTodo: IdCallback
}

export default function TodoList( props: TodoListProps ) {

    function generateCards( status:TodoStatus, withAdvance:boolean, withDelete:boolean ) {
        return props.todoList
            .filter( e => e.status === status)
            .map( (e: Todo) =>
                <TodoCard
                    key={e.id}
                    todo={e}
                    hideStatus={true}
                    deleteTodo={withDelete ? props.deleteTodo : undefined}
                    advanceTodo={withAdvance ? props.advanceTodo : undefined}
                />
            )
    }

    return (
        <>
            <AddTodo addTodo={props.addTodo}/>
            <div className="AllTodoLists">
                <div className="CardGroupContainer">Open  <div className="CardGroup">{generateCards("OPEN"       , true, false)}</div></div>
                <div className="CardGroupContainer">Doing <div className="CardGroup">{generateCards("IN_PROGRESS", true, false)}</div></div>
                <div className="CardGroupContainer">Done  <div className="CardGroup">{generateCards("DONE"       , false, true)}</div></div>
            </div>
        </>
    )

}