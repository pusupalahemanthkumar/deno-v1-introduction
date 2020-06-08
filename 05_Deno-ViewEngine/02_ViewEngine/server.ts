/*  Introduction To Rendering HTML,CSS and Static Files inside Deno with View Engine Template */

// Importing Required Files And Packages Here.
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

// Initializing App Here.
const app = new Application();

//  Setting Up Ejs Templating Engine Here.
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

// Serving A Static Folder Here.
app.use(async (ctx,next)=>{
    await send(ctx,ctx.request.url.pathname,{
        root :`${Deno.cwd()}/public`
    })
    next();
})

// Initializing Router Here.
const router = new Router();

// Defining Routes Here.
router.get("/", (ctx) => {
    ctx.render("views/index.ejs", {
      payload: {
        text: "Introduction To Templating Engines In Deno.",
      },
    });
  });
  

// MiddleWares Here.
app.use(viewEngine(oakAdapter, ejsEngine));
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server Started On Port Number 8000.");
await app.listen({ port: 8000 });

// Run : deno run --allow-net --allow-read server.ts