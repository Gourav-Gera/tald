import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials: any) {
            console.log({ credentials });
        const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return Promise.resolve(user);
        // try {
        //   const response = await axios.post(
        //     "https://third-party-api.com/signin",
        //     {
        //       email: credentials.email,
        //       password: credentials.password,
        //     }
        //   );

        //   const accessToken = response.data.access_token;

        //   if (accessToken) {
        //     const user = response.data.user;
        //     return Promise.resolve(user);
        //   } else {
        //     return Promise.resolve(null);
        //   }
        // } catch (error) {
        //   console.error("Authentication error:", error);
        //   return Promise.resolve(null);
        // }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
        console.log({ token, account, user })
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in"
  }
};
