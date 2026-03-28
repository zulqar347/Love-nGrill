import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";

import type { Session, User } from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  events: {
    async createUser({ user }: { user: User }) {
      const client = await clientPromise;
      const db = client.db();

      const role =
        user.email === "zulqurnainghufran407@gmail.com" ? "admin" : "user";

      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(user.id) }, { $set: { role } });
    },
  },

  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      const client = await clientPromise;
      const db = client.db();

      const dbUser = await db.collection("users").findOne({
        _id: new ObjectId(user.id),
      });

      if (session.user) {
        session.user.id = user.id;
        session.user.role = dbUser?.role || "user";
      }

      return session;
    },
  },
});
