import { MongoClient } from "mongodb";

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@teatshare.ryek8.mongodb.net/TeatShare?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {});

export const getAllUsers = async () => {
  try {
    await client.connect();
    return await client.db("TeatShare").collection("User").find({}).toArray();
  } catch (e) {
    return { error: e };
  } finally {
    await client.close();
  }
};

export const createNewUser = async ({ firstName, lastName }) => {
  try {
    if (!firstName || !lastName) {
      return false;
    }

    await client.connect();

    return await client
      .db("TeatShare")
      .collection("User")
      .insertMany([{ firstName, lastName }]);
  } catch (e) {
    return { error: e };
  } finally {
    await client.close();
  }
};
