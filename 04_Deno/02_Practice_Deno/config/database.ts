// Importing Required Files And Packages Here.
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

// Setting up MONGODB Connection Here.

// Initializig MongoDb Driver Here
const client = new MongoClient();

// Connecting 
client.connectWithUri(
  "PLACE YOUR MONGODB URI HERE",
);

// Database
const db = client.database("deno");

// Exporting db Here.
export default db;
