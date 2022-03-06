import {
  Condition,
  Db,
  Join,
  MongoClient,
  NestedPaths,
  PropertyType,
  RootFilterOperators,
  WithId,
} from "mongodb";

const uri = process.env.MONGODB_URI;

// Using global to keep the connection across hot reloads
// See https://www.mongodb.com/community/forums/t/connections-not-closed-with-nextjs/115037/3
let cachedClient: MongoClient = global.mongo;
let cachedDb: Db | undefined = global.mongo?.db;

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

  const db = (global.mongo.db = cachedDb || client.db("TeatShare"));

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};

const getDatabase = async (): Promise<Db> => {
  const { db } = await connectToDatabase();
  return db;
};

// Fix type for TypeScript
export type Filter<TSchema> = {
  [Property in Join<NestedPaths<WithId<TSchema>>, ".">]?: Condition<
    PropertyType<WithId<TSchema>, Property>
  >;
} & RootFilterOperators<WithId<TSchema>>;

export { getDatabase };
