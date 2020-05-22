import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import router from "./routes.ts";


const PORT =5000;

const app = new Application();



app.use(router.routes());
// Allowing All Methods
app.use(router.allowedMethods()); 


console.log(`Sever running on Port ${PORT}`);

await app.listen({port : PORT})