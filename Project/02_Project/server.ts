/*                Speech Recognition App               */

// Importing Required Files And Packages Here.
import { Application, send } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

import router from "./routes/routes.ts";

// Setting Up Ejs Template Engine
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

// Initializing App Here.
const app = new Application();

// MiddleWares Here
app.use(viewEngine(oakAdapter, ejsEngine));
app.use(router.routes());
app.use(router.allowedMethods());

// Serving A Static Folder Here.
app.use(async (ctx, next) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
  });
  next();
});

console.log("Server Started At Port Number 8000");
app.listen({ port: 8000 });
