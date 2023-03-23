import React, { useEffect } from "react"
import { Storage } from '@ionic/storage';
import { TodoContextType, ITodo } from "../@types/todo"
import { Props } from "../@types/extending"

// Cria o contexto para o TODO
export const TodoContext = React.createContext<TodoContextType | null>(null)
// Cria referência única para o storage
let storage: Storage

/**
 * Recupera uma lista de TODOS persistidas no storage.
 * Caso a referência do storage não referencia uma instancia,
 * uma instancia do storage é iniciada.
 * 
 * @return {ITodo[]} Lista de TODOS persistidas no storage.
 */
async function fetchTodos() {

  // verifica se instância já foi criada, criando quando necessário
  if (!storage) {
    storage = new Storage()
    await storage.create();
  }

  return (await storage.get('todos') || [])
}

/**
 * Implementa o provedor de dados a ser passado para
 * os elementos filhos
 * 
 * @param {Props} props Propriedades com um elemento ReactNode
 * @return {React.Provider<TodoContextType>} Provedor de dados do todo
 */
export default function TodoProvider({ children }: Props) {

  // estado para ler e atualizar a lista de todos
  const [todos, setTodos] = React.useState<ITodo[]>([])

  // inicializa a lista com os valores previamente persistidos
  useEffect(() => {
    fetchTodos().then(todos => setTodos(todos))
  })

  // implementa função para salvar um novo todo
  const saveTodo = async (todo: ITodo) => {
    let newTodos = [...todos, todo]
    await storage.set('todos', newTodos)
    setTodos(newTodos)
  }

  // implementa função para deletar um todo existente
  const deleteTodo = async (key: number) => {
    let newTodos = todos.filter((_, idx) => idx !== key)
    await storage.set('todos', newTodos)
    setTodos(newTodos)
  }

  //implementa função para atualizar um todo existente
  const updateTodo = async (key: number, newTodo: ITodo) => {
    let newTodos = todos.map((todo, idx) => idx !== key ? todo : newTodo)
    await storage.set('todos', newTodos)
    setTodos(newTodos)
  }

  return <TodoContext.Provider value={{ todos, saveTodo, deleteTodo, updateTodo }}>{children}</TodoContext.Provider>
}