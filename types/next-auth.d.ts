// types/next-auth.d.ts
import { Session as NextAuthSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & NextAuthSession["user"];
  }

  interface User extends AdapterUser {
    role: Role;
  }
}
