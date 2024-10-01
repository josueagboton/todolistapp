<template>
  <div class="h-screen container">
    <div class="p-4 grid justify-items-center bg-slate-300">
      <div class="container justify-items-center mb-5">
        <h1 class="font-bold text-3xl mb-8">Todo List App</h1>

        <select v-model="todoStore.filter" @change="updateFilter($event)">
          <option value="all">ALL</option>
          <option value="done">Fini</option>
          <oDption value="ongoing">En cours</oDption>
        </select>
      </div>
      <div class="flex flex-row">
        <div>
          <input
            type="text"
            placeholder="Enter your todo"
            class="border rounded-md p-3"
            v-model="input"
          />
        </div>
        <button
          class="bg-green-500 hover:bg-green-700 text-white mx-8 p-3 rounded-md"
          @click="Ajouter"
        >
          Ajouter
        </button>
      </div>

      <ul class="flex flex-col my-5 justify-around">
        <li
          class="justify-items-center my-4 border"
          v-for="(todo, index) of todoStore.todoList"
        >
          <div
            v-if="!todo.editMode"
            @click="updateTodo(todo.id!, { done: !todo.done })"
          >
            <span class="mx-4">{{ todo.content }}</span>

            <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white p-3 mx-3"
              @click.stop="updateTodo(todo.id!, { editMode: true })"
            >
              Modifier
            </button>
            <input type="checkbox" :checked="todo.done" />
            <button
              class="bg-red-500 hover:bg-red-600 text-white p-3 mx-3"
              @click.stop="deleteTodo(todo.id!)"
            >
              Suprimer
            </button>
          </div>
          <div v-else>
            <TodoForm
              :content="todo.content"
              @cancel="updateTodo(todo.id!, { editMode: false })"
              @update="
                updateTodo(todo.id!, { editMode: false, content: $event })
              "
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { TodoState, useTodos } from "./shared/stores/todoStore";
import { Todo } from "./shared/interfaces/todo.interface";
import TodoForm from "./components/TodoForm.vue";
import { Filter } from "./shared/types";

const input = ref<string>();
const todoStore = useTodos();
todoStore.fetchTodo();
console.log(todoStore.todos);

console.log("les getters", todoStore.todoList);
const todos = todoStore.todoList;
// function Ajouter() {
//   todoStore.todos.push({
//     content: input.value,
//     done: false,
//   });
//   input.value=''
// }

function Ajouter() {
  todoStore.addTodo(input.value as string);
  input.value = "";
}
function updateFilter(event: any) {
  const target = event.target as HTMLSelectElement;
  todoStore.updateFilter(target.value as Filter);
}

function deleteTodo(index: number) {
  todoStore.deleteTodo(index);
}

function toggleTodo(index: number) {
  todoStore.toggleTodo(index);
}

function updateTodo(index: number, todo_update: Partial<Todo>) {
  todoStore.editUpdateTodo(index, todo_update);
}
</script>
