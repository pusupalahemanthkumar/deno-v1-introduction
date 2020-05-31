/*      Introduction To Deno     */

// Importing Required Files And Packages Here.
import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import router from "./routes/routes.ts";
import pageNotFound from "./404.ts";

const env = config();
console.log(env);

// Defining Global Constants Here
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

// Initializing App Here.
const app = new Application();

// MiddleWares Here.
app.use(router.routes());
app.use(router.allowedMethods());

// Not Found Route Handling Here.
app.use(pageNotFound);

console.log(`server is started at ${HOST}:${PORT}`);
await app.listen({ port: PORT });

// Run deno run --allow-net --allow-write --allow-read --allow-plugin --unstable server.ts