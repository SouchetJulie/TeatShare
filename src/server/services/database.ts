import { MongoClient } from 'mongodb';

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@teatshare.ryek8.mongodb.net/TeatShare?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {});
client.connect().then();

export const database = client.db('TeatShare');
