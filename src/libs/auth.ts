import { verifyToken, customToken, customVerify } from "@/utils/jwt";
import type { CustomSession } from "@/interfaces";
import type { NextAuthOptions, Session, TokenSet, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        access_token: {
          placeholder: "access_token",
          type: "access_token",
          label: "access_token",
        },
      },
      async authorize(credentials) {
        try {
          const { id, email } = verifyToken(credentials?.access_token);

          return {
            id,
            name: "user",
            access_token: credentials?.access_token,
            email,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    decode({ secret, token }) {
      return customVerify(token, secret) as JWT;
    },
    encode({ secret, token }) {
      return customToken(token as JWT, secret);
    },
  },
  callbacks: {
    session({
      session,
      user,
      token,
    }: {
      session: Session | CustomSession | any;
      user: User;
      token: TokenSet;
    }) {
      session.user.id = token.id;
      session.user.access_token = token.access_token;
      session.user.email = token.email;

      return session;
    },
    jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT | any;
      user?: any;
      account?: any;
      profile?: any;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account) {
        token.access_token = user?.access_token;
      }
      return token;
    },
  },
};
