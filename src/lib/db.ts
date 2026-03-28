import mongoose from "mongoose";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGODB_URI);
export const clientPromise = client.connect();

const mongodb_uri = process.env.MONGODB_URI!;

export const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already Connected");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting");
    return;
  }
  try {
    await mongoose.connect(mongodb_uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("Connection to MondoDB Failed", error);
    throw new Error();
  }
};
