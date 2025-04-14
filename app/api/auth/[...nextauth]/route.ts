import NextAuth, { AuthOptions, Session, User, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";

export const authOptions: AuthOptions = {
  // eslint-disable-next-line
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      try {
        if (!user.email || !account) {
          console.error("[SIGNIN_ERROR] No email or account:", {
            user,
            account,
          });
          return false;
        }

        console.log("[SIGNIN] Processing user:", user.email);

        // Cek user
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // Bikin user kalau nggak ada
        if (!dbUser) {
          console.log("[SIGNIN] Creating new user:", user.email);
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? user.email.split("@")[0],
              image: user.image,
              role: user.email === "alphrenoorz@gmail.com" ? "ADMIN" : "USER",
              provider: account.provider,
              providerId: account.providerAccountId,
            },
          });
        }

        // Cek account
        const existingAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        // Bikin account kalau nggak ada
        if (!existingAccount) {
          console.log("[SIGNIN] Creating new account for:", user.email);
          await prisma.account.create({
            data: {
              userId: dbUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });
        }

        console.log("[SIGNIN] Success for:", user.email);
        return true;
      } catch (error) {
        console.error("[SIGNIN_ERROR]", error);
        return false;
      }
    },
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.image = user.image;
      }
      return session;
    },
  },
  session: {
    strategy: "database" as const,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
