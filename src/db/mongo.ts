import { MongoClient, Db } from "mongodb";
import { config } from "dotenv";
config();
const uri: string = String(process.env.URI);
const dbName: string = String(process.env.DB);
let db: Db;
MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(err);
        process.exit();
    }
    db = client.db(dbName);
    console.log("db is connect");
});

export const getDb = () => db;
