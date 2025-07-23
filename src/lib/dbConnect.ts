// src/lib/dbConnect.ts
import mongoose from 'mongoose';

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not set in environment.");

  await mongoose.connect(mongoUri);
  isConnected = true;
}
