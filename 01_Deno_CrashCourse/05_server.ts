import {serve} from "https://deno.land/std/http/server.ts";

const s=serve({port :8000});
console.log("https://deno.land/std/http/server.ts");
for await (const req of s){
    req.respond({body :"Hello World From Deno\n"});
} 