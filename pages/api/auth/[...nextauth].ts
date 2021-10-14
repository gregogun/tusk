/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // cookies: {
  //   secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  // },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.userId = token.uid;
      //console.log(session);
      return Promise.resolve(session);
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.uid = user.id;
      }
      //console.log(token);
      return Promise.resolve(token);
    },
  },
  // database: process.env.DATABASE_URL,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
