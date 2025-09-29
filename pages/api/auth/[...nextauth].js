import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("account:", account);
      console.log("sub value:", account?.providerAccountId);

      try {
        await axios.post(`${process.env.NEXTAUTH_URL}/api/users`, {
          sub: account?.providerAccountId,
          email: profile?.email,
          name: profile?.name,
        });
      } catch (error) {
        console.error("Error syncing user with Supabase:", error);
      }

      console.log("Signed in user", user);
      const allowedEmails = ["johnaditya46@gmail.com"];

      // Check if the user's email is in the allowed list
      if (allowedEmails.includes(profile?.email)) {
        return true; // Allow sign-in for allowed emails
      }
      return false; // Return false to prevent sign-in
    },
  },
});
