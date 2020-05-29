/*      Introduction To Oak Router In Deno      */

// Importing Required Files And Packages Here.
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// Initializing App Here.
const app = new Application();

// Initializing Router Here.
const router = new Router();

// Defining Routes Here.
router.get("/user", (ctx) => {
  ctx.response.body = " Hello Everyone . This is Hemanth Kumar.";
});

router.get("/users", (ctx) => {
  ctx.response.body = {
    name: "Hemanth Kumar",
    skills: "Full Stack Webdeveloper",
  };
});

router.get("/user/:id", (ctx) => {
  console.log(ctx.params.id);
  ctx.response.body = {
    msg: "Params Route",
    value: ctx.params.id,
  };
});

router.post("/user", async (ctx) => {
  const data = await ctx.request.body();
  console.log(data);
  ctx.response.status = 201;
  ctx.response.body = {
    user: data.value,
  };
});

// App Middlewares Here.
app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.status = 404;
  ctx.response.body = {
    error: "Page Not Found",
  };
});

console.log("Server is Started On Port Number 8000");
await app.listen({ port: 8000 });
