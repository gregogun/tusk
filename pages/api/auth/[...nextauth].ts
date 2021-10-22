/* eslint-disable no-param-reassign */
import NextAuth, { Account, NextAuthOptions, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { NextApiHandler } from 'next';
import { server } from 'config';

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.userId = token.uid as number;
      }
      return Promise.resolve(session);
    },
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  debug: true,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
