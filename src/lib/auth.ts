import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log("✅ SIGN IN CALLBACK (v5)", {
                provider: account?.provider,
                user: user,
            });

            if (!user.email) return false;

            const name =
                user.name ??
                user.email.split("@")[0];

            const existing = await db
                .select()
                .from(users)
                .where(eq(users.email, user.email))
                .limit(1);

            if (existing.length === 0) {
                await db.insert(users).values({
                    email: user.email,
                    name,
                    image: user.image,
                });
            } else {
                await db
                    .update(users)
                    .set({
                        name,
                        image: user.image,
                        updatedAt: new Date(),
                    })
                    .where(eq(users.email, user.email));
            }

            return true;
        },
    },
});