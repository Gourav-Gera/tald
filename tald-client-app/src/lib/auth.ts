import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axiosInstance from "./axiosInstance";

export const authOptions: NextAuthOptions = {
  providers: [
    // 💼 Credentials provider for email/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "📧 Email", type: "email" },
        password: { label: "🔐 Password", type: "password" },
        type: { label: "🏢 Type", type: "text" },
      },
      async authorize(credentials: any) {
        try {
          // Make API call to authenticate using email/password
          const response = await axiosInstance.post("/user/auth/login", {
            email: credentials.email,
            password: credentials.password,
            type: credentials?.type || "Vendor",
          });

          const accessToken = response.data.value.token;

          if (accessToken) {
            const user = response.data;
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("🚫 Authentication failed");
        }
      },
    }),

    // 🌐 Google provider for Google authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle JWT token data based on provider
      const userData = user as any;
      if (userData && account?.provider === "credentials") {
        // Handle JWT token data for credentials provider
        try {
          // Calculate expiration timestamp from user data
          const expirationTimestamp = Math.floor(
            new Date(userData.value?.expires).getTime() / 1000
          );

          // Update token with user data and expiration
          token.id = userData.data._id;
          token.accessToken = userData.value.token;
          token.user = userData.data;
          token.exp = expirationTimestamp;
        } catch (error) {
          console.error("JWT handling error:", error);
          throw new Error("🔒 JWT handling failed");
        }
      } else if (account?.provider === "google") {
        // Handle JWT token data for Google provider
        try {
          // Make API call to register user with Google data
          const { data: response } = await axiosInstance.post(
            "/user/auth/socialLogin",
            {
              email: user.email,
              name: user.name,
              socialId: user.id,
              type: "Vendor",
            }
          );

          // Calculate expiration timestamp from API response
          const expirationTimestamp = Math.floor(
            new Date(response.value?.expires).getTime() / 1000
          );

          // Update token with API response data and expiration
          token.id = response.data._id;
          token.user = response?.data;
          token.accessToken = response.value.token;
          token.exp = expirationTimestamp;
        } catch (error) {
          console.error("JWT handling error:", error);
          throw new Error("🔑 JWT handling failed");
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Set session user data from token
      session.user = token;
      return session;
    },
    async redirect({ baseUrl }) {
      // Customize redirection after authentication
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
