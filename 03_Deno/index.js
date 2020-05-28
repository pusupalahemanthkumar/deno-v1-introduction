// Importing Required Files And Packages Here.
import {Application} from "https://deno.land/x/oak/mod.ts";

import {PORT} from "./config.js";
import router from "./router.js";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on Port Number ${PORT}.`);

await app.listen({port: PORT});
