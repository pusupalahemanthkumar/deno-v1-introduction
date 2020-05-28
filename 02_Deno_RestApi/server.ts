// Importing Required Files And Packages Here.
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";


// Defining PORT Number Here.
const PORT =5000;

// InitialIzing App Here
const app = new Application();


// Initializing Router Here.
app.use(router.routes());

// Allowing All Methods.
app.use(router.allowedMethods()); 

console.log(`Sever running on Port ${PORT}`);

await app.listen({port : PORT})