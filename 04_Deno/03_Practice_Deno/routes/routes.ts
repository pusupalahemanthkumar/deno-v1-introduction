// Importing Required Files And Packages Here.
import { Router } from "https://deno.land/x/oak/mod.ts";

import { getIndex, getUser, storeUser,updateUser,deleteUser } from "../controllers/user.ts";
import {login} from "../controllers/auth.ts";

// Initializing Router Here.
const router = new Router();

// Defining Routes Here.
router.get("/user", getIndex);

router.get("/user/:id", getUser);

router.patch("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

router.post("/user", storeUser);

router
  .post("/login", login);

export default router;
