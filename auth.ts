// auth.ts
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "@/lib/db";
import authConfig from "./auth.config";
import { ObjectId } from "mongodb";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig, // Spread the base config here
  events: {
    async createUser({ user }) {
      const client = await clientPromise;
      const db = client.db();

      // Check for your specific admin email
      const role =
        user.email === "zulqurnainghufran407@gmail.com" ? "admin" : "user";

      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(user.id) }, { $set: { role } });
    },
  },
});
