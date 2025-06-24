import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is where you'd typically look up the user from a database.
        // For this example, we'll use hardcoded users.
        const users = [
          {
            id: '1',
            email: 'student@test.com',
            password: 'student',
            role: 'student',
          },
          {
            id: '2',
            email: 'coach@test.com',
            password: 'coach',
            role: 'coach',
          },
          {
            id: '3',
            email: 'admin@test.com',
            password: 'admin',
            role: 'admin',
          },
        ];

        const user = users.find((user) => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          // Return a user object, which will be stored in the session.
          // Don't include the password in the returned object.
          return { id: user.id, name: user.email, role: user.role };
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