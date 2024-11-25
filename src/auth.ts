import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import Resend from "next-auth/providers/resend";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      from: "noreply@email.selfscribe.xyz",
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      console.log("inside auth fx");
      return !!auth;
    },
  },
});
