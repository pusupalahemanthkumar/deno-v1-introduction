// Importing Required Files And Packages Here.
import { Router } from "https://deno.land/x/oak/mod.ts";

import { getToDos } from "../controllers/ToDos.ts";

// Initializing Router Here.
const router = new Router();

// Defining ToDos Routes Here.
router.get("/api/todos", getToDos);

export default router;
