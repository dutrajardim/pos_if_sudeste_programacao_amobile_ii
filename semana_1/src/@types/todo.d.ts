//@types.todo.ts

// Define interface para os objetos Todo
export interface ITodo {
    title: string
    description: string
}

// Abstração para o contexto de TODO
export type TodoContextType = {
    todos: ITodo[]
    saveTodo: (todo: ITodo) => void
    deleteTodo: (key: number) => void
    updateTodo: (key: number, newTodo: ITodo) => void
}
