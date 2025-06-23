import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is where you'd typically look up the user from a database.
        // For this example, we'll use hardcoded users.
        const users = [
          { id: '1', username: 'student', password: 'password', role: 'student' },
          { id: '2', username: 'coach', password: 'password', role: 'coach' },
          { id: '3', username: 'admin', password: 'password', role: 'admin' },
        ];

        const user = users.find(
          (user) => user.username === credentials.username
        );

        if (user && user.password === credentials.password) {
          // Return a user object, which will be stored in the session.
          // Don't include the password in the returned object.
          return { id: user.id, name: user.username, role: user.role };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig; 