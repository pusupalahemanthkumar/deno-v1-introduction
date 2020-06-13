// Importing Required Files And Packages
import {Router} from "https://deno.land/x/oak/mod.ts";

// Initializing Router Here.
const router =new Router();

router.get("/stt",(ctx:any)=>{
  // ctx.response.body="stt Route";
  ctx.render("views/speechToText.ejs");
})

router.get("/tts",(ctx:any)=>{
  // ctx.response.body="tts Route";
  ctx.render("views/textToSpeech.ejs");
})
router.get("/",(ctx:any)=>{
  // ctx.response.body="home Route";
  ctx.render("views/index.ejs")
})


export default router;
