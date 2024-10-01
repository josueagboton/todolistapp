import { Todo } from "../interfaces/todo.interface";

const BASE_URL = "http://127.0.0.1:3000/todos";
export async function fetchTodo(): Promise<Todo[]> {
  try {
    const response = await fetch("http://127.0.0.1:3000/todos");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function deleteTodo(id: number) {
  await await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

export async function updateTodo(id: number, update: Todo): Promise<Todo> {
  const updatedTodo = await (
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return updatedTodo;
}

export async function addTodo(todo: Todo): Promise<Todo> {
  return await (
    await fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
}
