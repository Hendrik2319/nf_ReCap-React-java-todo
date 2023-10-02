export type Todo = {
    id?: string,
    description: string,
    status: TodoStatus
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE"

export type TodoCallback = (entry: Todo) => void;
export type IdCallback   = (id: string) => void;
