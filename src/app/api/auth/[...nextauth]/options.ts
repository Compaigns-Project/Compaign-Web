import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {

  secret: 'VideoDashboardCompaign',

  providers: [
  
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Enter Username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = { id: "42", name: "VideoDashboard", password: "10Compaigns/day" };

        if (
          credentials?.username === user.name 
          &&
          credentials?.password ===  user.password
        ) {
          return user;
        } else {
          return Promise.reject(new Error("Invalid username or password"));;
        }
      },
    }),
  ],
};