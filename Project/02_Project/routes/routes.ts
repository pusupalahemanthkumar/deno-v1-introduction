// Importing Required Files And Packages Here.
import { Router } from "https://deno.land/x/oak/mod.ts";

// Initializing Router Here.
const router = new Router();

//  This Code is Not Working 
// router.get("/stt", (ctx: any) => {
//   ctx.render("views/speechToText.ejs");
// });
// router.get("/tts", (ctx: any) => {
//   ctx.render("views/textToSpeech.ejs");
// });

router.get("/", (ctx: any) => {
  ctx.render("views/index.ejs");
});

export default router;
