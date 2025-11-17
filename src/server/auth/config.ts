import GoogleProvider from "next-auth/providers/google";
import nodemailer from "nodemailer";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }
        // Find user in DB
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });
        if (!user || typeof user.password !== "string") return null;
        // Check password
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  events: {
    async createUser({ user }: { user: any }) {
      if (user.email) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: user.email,
          subject: "Welcome to Hair with Iryna!",
          text: `Hi ${
            user.name || "there"
          },\n\nThank you for registering with us using Google! Your account is ready to use.\n\nBest,\nHair with Iryna Team`,
        });
      }
    },
  },
};
