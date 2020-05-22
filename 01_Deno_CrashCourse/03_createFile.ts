const encoder =new TextEncoder();

const greetText =encoder.encode("Hello Everyone. \n This is Hemanth kumar.");

await Deno.writeFile("greet.txt",greetText);