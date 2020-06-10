/*      Introduction To File Uploads In Deno        */

// Importing Required Files And Packages Here.
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";
import {upload} from "https://deno.land/x/upload_middleware_for_oak_framework/mod.ts";

// Initializing App Here.
const app =new Application();

const router =new Router();

//  Setting Up Ejs Templating Engine Here.
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

// Defining Routes Here.
router.get("/",(ctx)=>{
    ctx.render('views/index.ejs')
})

router.post("/upload", upload("uploads"), async (ctx :any,next:any)=>{
    const file =ctx.uploadedFiles;
    console.log(file);
    ctx.response.redirect("/");

})


// MiddleWares Here.
app.use(viewEngine(oakAdapter, ejsEngine));
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server Started On Port Number 8000.");
await app.listen({ port: 8000 });

// Run : deno run --allow-net --allow-read server.ts