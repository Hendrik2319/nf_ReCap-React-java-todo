export type Todo = {
    id: string | null,
    description: string,
    status: TodoStatus
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE"