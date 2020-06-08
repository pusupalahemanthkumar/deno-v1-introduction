/*          Introduction To Templating Engines In Deno.          */

// Importing Required Files And Packages Here.
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

// Setting Up Ejs Templating Engine Here.
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

// Initializing App Here.
const app = new Application();

// MiddleWares Here.
app.use(viewEngine(oakAdapter, ejsEngine));

app.use(async (ctx, next) => {
  ctx.render("./views/index.ejs", {
    payload: {
      text: "Introduction To Templating Engines In Deno.",
    },
  });
});

console.log("Server Started On Port Number 8000.");
await app.listen({ port: 8000 });
