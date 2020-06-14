/* Introduction To Websockets In Deno */
// Importing Required Files And Packages Here.
import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptable,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";

const Connections = new Array<WebSocket>();
async function main() {
  console.log("Server is started at http://localhost:8080");

  for await (const req of serve("localhost:8080")) {
    if (acceptable(req)) {
      const { conn, headers, w:bufWriter, r:bufReader } = req;
      acceptWebSocket({ conn, headers, bufReader, bufWriter })
        .then(handleWebSockets);
    } else {
      if (req.method === "GET" && req.url === "/") {
        return req.respond({
          headers: new Headers({
            "content-type": "text/html",
          }),

          body: await Deno.open("./index.html"),
        });
      } else {
        req.respond({ body: "not found" });
      }
    }
  }
}

async function handleWebSockets(ws: WebSocket) {
  console.log("WebSokects Connection Established.");
  Connections.push(ws);
  console.log(Connections.length);
  for await (const event of ws) {
    if (typeof event === "string") {
      // console.log(event);
      // ws.send(event);
      broadcastEvent(ws, event);

      if (isWebSocketCloseEvent(event)) {
        console.log("WebSokets Connection Closed!");
      }
    }
  }
}
function broadcastEvent(ws: WebSocket, event: string) {
  for (const websocket of Connections) {
    if (websocket !== ws) {
      websocket.send(event);
    }
  }
}

main();
