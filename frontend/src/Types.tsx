export const DEBUG = true

export type Todo = {
    id?: string,
    description: string,
    status: TodoStatus
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE"
export function getNextStatus( status:TodoStatus ): TodoStatus | undefined {
    switch (status) {
        case "OPEN"       : return "IN_PROGRESS"
        case "IN_PROGRESS": return "DONE"
        default: return undefined
    }
}

export type TodoCallback = (entry: Todo) => void;
export type IdCallback   = (id: string) => void;
