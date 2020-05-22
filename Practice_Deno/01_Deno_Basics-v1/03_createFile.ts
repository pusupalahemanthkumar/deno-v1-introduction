const encoder =new TextEncoder();

const greetText =encoder.encode("Welcome To Deno World.!");

await Deno.writeFile("greet.txt",greetText);