import { Db, MongoClient } from 'mongodb';

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@teatshare.ryek8.mongodb.net/TeatShare?retryWrites=true&w=majority`;

let cachedClient = null;
let cachedDb = null;

/**
 * Connect to MongoDB client and our database
 */
export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = cachedClient || await MongoClient.connect(uri, {});

  const db = cachedDb || client.db('TeatShare');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export const getDatabase = async (): Promise<Db> => {
  const {db} = await connectToDatabase();
  return db;
}