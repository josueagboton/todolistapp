<template>
  <div class="h-screen container">
    <div class="p-4 grid justify-items-center bg-slate-300">
      <h1 class="font-bold text-3xl mb-8">Todo List App</h1>

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

      <ul class="flex flex-col my-5">
        <li
          class="justify-items-centere my-4"
          v-for="todo of todoStore.todoList"
        >
          {{ todo.content }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { TodoState, useTodos } from "./stores/todoStore";

const input = ref<string>();
const todoStore = useTodos();
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
  // todoStore.$patch((state: TodoState)=>{
  //   state.todos.push({
  //     content: input.value,
  //     done: false
  //   })
  // })
  // input.value=''

  todoStore.addTdodo(input.value as string);
  input.value = "";
}
</script>
