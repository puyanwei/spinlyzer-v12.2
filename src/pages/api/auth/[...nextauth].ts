import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
    // ...add more providers here
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
          placeholder: 'Enter your name',
        },
      },
      async authorize(credentials, _req) {
        const user = { id: 1, name: credentials?.name ?? 'J Smith' };
        return user;
      },
    }),
  ],
  // callbacks: {
  //   session: async ({ session, user }) => {
  //     session.id = user.id;
  //     return Promise.resolve(session);
  //   },
  // },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
