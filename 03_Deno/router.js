// Importing Required Files And Packages Here.
import { Router } from "https://deno.land/x/oak/mod.ts";

import {getTodos ,addTodos,deleteTodo,updateTodo} from "./controllers/todos/todos.js";

// Initializing Router Here.
const router = new Router();


// Defining Routes Here.
router.get("/", ({ response }) => {
  response.body = "ToDo List API Using Deno.";
});

router.get("/todos",getTodos);

router.post("/todos",addTodos);

router.delete("/todos/:id",deleteTodo);

router.put("/todos/:id", updateTodo);

export default router;
