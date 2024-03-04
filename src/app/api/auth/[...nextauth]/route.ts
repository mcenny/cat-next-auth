import { API } from '@/lib/api';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await API.post('/auth/refresh', {
      headers: {
        Authorization: `Refresh ${token.backendToken.refreshToken}`,
      },
    });
    const response = await res.data;
    console.log(response, ':: refresh');
    return { ...token, backendTokens: response };
  } catch (error) {
    console.log(error, ':: refresh error');
    return { ...token, backendTokens: null };
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials.
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const { username, password } = credentials;
        const res = await API.post('/auth/login', { username, password });
        if (res.status === 401) {
          console.log(res.statusText);
          return null;
        }
        const user = res.data;
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendToken.expiresIn) return token;
      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendToken = token.backendToken;
      return session;
    },
  },

  // pages: {
  //   signIn: '/login',
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
