import { FILE_PATH } from "../../config.js";

export const getTodos = async ({ response }) => {
  const decoder = new TextDecoder();
  try {
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    console.log(todos);
    response.status = 200;
    response.body = {
      status: "Success",
      todos,
    };
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.body = {
      status: "Error",
      todos: [],
    };
  }
};
export const addTodos = async ({ response, request }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const {
      value: { title },
    } = await request.body();
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    const newTodo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    };
    todos.push(newTodo);
    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(todos)));
    response.status = 201;
    response.body = {
      status: "Success",
      todo: newTodo,
    };
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.body = {
      status: "Failed",
    };
  }
};

export const deleteTodo = async ({ response, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== Number(params.id)
    });
    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(updatedTodos))
    );
    response.status = 200;
    response.body = {
      status: "Successfully deleted",
      todos: updatedTodos,
    };
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.body = {
      status: "Failed",
    };
  }
};

export const updateTodo = async ({ response, request, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const {
      value: { title, completed },
    } = await request.body();
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    const updatedTodos = todos.map(p => p.id ===Number(params.id) ? { ...p, title: title, completed:completed } : p)
    

    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(updatedTodos)));
    response.status = 201;
    response.body = {
      status: "Successfully Updated",
      todos:updatedTodos
    };
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.body = {
      status: "Failed",
    };
  }
};
