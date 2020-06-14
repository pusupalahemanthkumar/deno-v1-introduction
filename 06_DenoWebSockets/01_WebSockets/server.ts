/* Introduction To Websockets In Deno */
// Importing Required Files And Packages Here.
import { serve } from "https://deno.land/std/http/server.ts";

async function main() {
  console.log("Server is started at http://localhost:8080");
  for await (const req of serve("localhost:8080")) {
      req.respond({body: "Hello Websokets!"})
  }
}
main();
