import { verify } from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn(user) {
      console.log(user);
      const allowedEmails = ["johnaditya46@gmail.com"];

      // Check if the user's email is in the allowed list
      if (allowedEmails.includes(user?.profile?.email)) {
        return true; // Allow sign-in for allowed emails
      }
      return false; // Return false to prevent sign-in
    },
  },
});
