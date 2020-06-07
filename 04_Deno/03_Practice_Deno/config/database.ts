// Importing Required Files And Packages Here.
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

// Defining Global Constants Here.
const Username = env.MONGODB_USERNAME;
const Password = env.MONGODB_PASSWORD;
// Initailizing MongoDb Driver Here.
const client = new MongoClient();

// Connecting With Database Here.
client.connectWithUri(
  `mongodb+srv://${Username}:${Password}@cluster0-xuuie.mongodb.net`,
);

// Database
const db = client.database("deno");

// Exporting db Here.
export default db;
