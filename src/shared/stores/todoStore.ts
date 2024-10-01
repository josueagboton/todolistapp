import { defineStore } from "pinia";
import { Todo } from "../interfaces/todo.interface";
import {
  addTodo,
  deleteTodo,
  fetchTodo,
  updateTodo,
} from "../services/todo.services";
import { Filter } from "../types/index"; // Correction de l'import ici

export interface TodoState {
  todos: Todo[];
  filter: Filter;
}

export const useTodos = defineStore("todos", {
  state: (): TodoState => ({
    todos: [],
    filter: "all",
  }),
  getters: {
    todoList(state: TodoState): Todo[] {
      return state.todos;
    },
  },
  actions: {
    // Déclencher un fetch
    async fetchTodo() {
      const todos = await fetchTodo();
      this.todos = todos;
    },
    async addTodo(content: string) {
      // Correction ici : addTodo au lieu de addTdodo
      const newTodo = await addTodo({
        content,
        done: false,
        editMode: false,
        filter: "ongoing",
      });
      console.log(content);

      this.todos.push(newTodo);
    },
    // Réactivation de updateFilter si nécessaire
    updateFilter(filter: Filter) {
      this.filter = filter;
    },
    async deleteTodo(id: number) {
      // Correction ici : deleteTodo au lieu de deteteTodo
      await deleteTodo(id);
      const index = this.todos.findIndex((t) => t.id === id);
      this.todos.splice(index, 1);
    },
    toggleTodo(index: number) {
      this.todos[index].done = !this.todos[index].done;
    },
    async editUpdateTodo(todoID: number, update: Partial<Todo>) {
      // Correction ici : editeUpateTodo devient editUpdateTodo
      const todoIndex = this.todos.findIndex((t) => t.id === todoID);
      const updatetodo = await updateTodo(todoID, {
        ...this.todos[todoIndex],
        ...update,
      } as Todo);
      this.todos[todoIndex] = updatetodo;
    },
  },
});
