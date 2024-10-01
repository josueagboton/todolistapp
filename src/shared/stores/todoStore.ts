import { defineStore } from "pinia";
import { Todo } from "../interfaces/todo.interface";
import {
  addTodo,
  deleteTodo,
  fetchTodo,
  updateTodo,
} from "../services/todo.services";

export interface TodoState {
  todos: Todo[];
}
export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [],
  }),
  getters: {
    todoList(state: TodoState): Todo[] {
      return state.todos;
    },
  },
  actions: {
    //declancher un fetch
    async fetchTodo() {
      const todos = await fetchTodo();
      this.todos = todos;
    },
    async addTdodo(content: string) {
      const newTodo = await addTodo({
        content,
        done: false,
        editMode: false,
      });
      console.log(content);

      this.todos.push(newTodo);
    },
    async deteteTodo(id: number) {
      await deleteTodo(id);
      const index = this.todos.findIndex((t) => t.id === id);
      this.todos.splice(index, 1);
    },
    toggleTodo(index: number) {
      this.todos[index].done = !this.todos[index].done;
    },
    async editeUpateTodo(todoID: number, update: Partial<Todo>) {
      const todoIndex = this.todos.findIndex((t) => t.id == todoID);
      const updatetodo = await updateTodo(todoID, {
        ...this.todos[todoIndex],
        ...update,
      } as Todo);
      this.todos[todoIndex] = updatetodo;
    },
  },
});
