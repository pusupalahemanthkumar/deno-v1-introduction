/*     Introduction To How To Work With Files In Deno */

let file = await Deno.open("greet.txt");

// Outputing File Data To Terminal
await Deno.copy(file,Deno.stdout);

file.close();
