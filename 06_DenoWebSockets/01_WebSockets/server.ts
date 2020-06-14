/* Introduction To Websockets In Deno */
// Importing Required Files And Packages Here.
import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";

const Connections =new Array<WebSocket>();
async function main() {
  console.log("Server is started at http://localhost:8080");


  for await (const req of serve("localhost:8080")) {
    const { conn, headers, w:bufWriter, r:bufReader } = req;
    acceptWebSocket({ conn, headers, bufReader, bufWriter })
      .then(async (ws: WebSocket): Promise<void> => {
        console.log("WebSokects Connection Established.");
        Connections.push(ws);
        console.log(Connections.length);
        for await (const event of ws) {
          if (typeof event === "string") {
            // console.log(event);
            // ws.send(event);
            for(const websocket of Connections){
                websocket.send(event);
            }
          }

          if (isWebSocketCloseEvent(event)) {
            console.log("WebSokets Connection Closed!");
          }
        }
      });
  }
}
main();
