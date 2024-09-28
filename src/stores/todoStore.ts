import { defineStore } from "pinia";
import { Todo } from "../interfaces/todo.interface";

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
    addTdodo(content: string) {
      console.log(content);

      this.todos.push({
        content,
        done: false,
      });
    },
  },
});
