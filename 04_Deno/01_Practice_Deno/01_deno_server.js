/*      Introduction To HTTP In Deno         */

/* 

NOTE:
1. File extension can be either ".js" or ".ts". Deno supports Both.
2. To RUN : " deno run --allow-net 01_deno_server.js "

*/

// Importing Required Files And Packages Here.
import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 8000 });

console.log(`Server Started On Port Number 8000.`);

// This Is Executed For Every Incoming Request.
for await (const req of server) {
  req.respond({
    body: "Hello World Form Deno",
  });
}
 