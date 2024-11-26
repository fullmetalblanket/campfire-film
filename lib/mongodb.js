// lib/mongodb.js

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error('Please define the MONGODB_URI and MONGODB_DB environment variables inside .env.local');
}

export function getMongoClient() {
  console.log('MONGODB_CLIENT:', !!globalThis.mongodbClient);
  if (!globalThis.mongodbClient) {
    const mongoUrl = MONGODB_URI + '/' + MONGODB_DB
    console.log('MONGODB_CLIENT: create new client',mongoUrl);
    globalThis.mongodbClient = new MongoClient(mongoUrl, {
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
  }
  console.log('MONGODB_CLIENT: done');
  return globalThis.mongodbClient;
}

export async function connectToDatabase() {
  const client = getMongoClient();
  if (!client.topology || !client.topology.isConnected()) {
    console.log('MONGODB_CLIENT: connecting');
    await client.connect();
    console.log('MONGODB_CLIENT: connected');
  }
  return client;
}

// This maintains compatibility with existing code expecting a clientPromise
export const clientPromise = connectToDatabase();

// Helper function to get a database instance
export async function getDatabase(dbName) {
  const client = await connectToDatabase();
  return client.db(dbName);
}

export default clientPromise;