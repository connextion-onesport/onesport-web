import type {NextAuthConfig} from 'next-auth';
import Google from 'next-auth/providers/google';

export default {
  providers: [Google],
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    session({session, token}) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
