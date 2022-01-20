import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient = null;
let cachedDb: Db = null;

/**
 * Connect to MongoDB client and our database
 */
export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return {client: cachedClient, db: cachedDb}
  }

  const client = cachedClient || await MongoClient.connect(uri, {});

  const db = cachedDb || client.db('TeatShare');

  cachedClient = client;
  cachedDb = db;

  return {client, db};
}

export const getDatabase = async (): Promise<Db> => {
  const {db} = await connectToDatabase();
  return db;
}

export const getClient = async (): Promise<MongoClient> => {
  const {client} = await connectToDatabase();
  return client;
}