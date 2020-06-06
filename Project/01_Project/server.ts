/*      TODOAPP  with  DENO           */

// Importing Required Files And packages Here.
import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import toDosRouter from "./routes/ToDos.ts";

const env = config();

// Defining Global Constants Here.
const Host = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 8000;

// Initializing App Here.
const app = new Application();

// MiddleWares Here.
app.use(toDosRouter.routes());
app.use(toDosRouter.allowedMethods());

console.log(`Server Started ${Host}:${PORT}`);
await app.listen({ port: PORT });
