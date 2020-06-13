/*      Deno Revision    */

// Importing Required Files And Packages Here.
import {Application ,Router} from "https://deno.land/x/oak/mod.ts";

// Initializing App Here.
const app =new Application();

// Initializing Router Here.
const router =new Router();

router.get("/",(ctx:any)=>{
    ctx.response.body="Home Route";
})
router.get("/test",(ctx: any)=>{
    ctx.response.body="Test Route"
})

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server Started At Port Number 8000");
await app.listen({port: 8000});