import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

declare global {
  // This needs to be a "var" instead of "const" or "let" to work
  // Also, it's used just below 👇👇 despite ESLint saying otherwise
  // eslint-disable-next-line no-unused-vars,no-var
  var mongo: MongoClient;
}

// Using global to keep the connection across hot reloads
// See https://www.mongodb.com/community/forums/t/connections-not-closed-with-nextjs/115037/3
let cachedClient: MongoClient = global.mongo;
let cachedDb: Db | undefined = global.mongo?.db();

/**
 * Connect to MongoDB client and our database
 */
const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = (global.mongo =
    cachedClient || (await MongoClient.connect(uri, {})));
  console.log("[DB] Opened new connection to database");

  const db = cachedDb || client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};

const getDatabase = async (): Promise<Db> => {
  const { db } = await connectToDatabase();
  return db;
};

export { getDatabase };
