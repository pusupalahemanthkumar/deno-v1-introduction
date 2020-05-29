/*      Introduction To Oak In Deno       */

// Importing Required Files And Packages Here.
import {Application} from "https://deno.land/x/oak/mod.ts";

// Initializing App Here.
const app =new Application();

app.use((ctx)=>{
    ctx.response.body="Hello World From Deno.";
})

console.log(`Server is Started On Port Number 8000`);
await app.listen({port :8000})