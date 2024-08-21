import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        await connectMongoDB();
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const newUser = new User({ name, email });
          await newUser.save();
        }
        return true;
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/note`;
      }
      return url;
    },
  },
};
