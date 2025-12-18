export const runtime = "nodejs";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "DummyJSON",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        console.log("Login credentials--->", credentials);

        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        console.log(user);

        if (res.ok && user.accessToken) {
          return {
            ...user,
            id: String(user.id), 
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user.token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
