"use server";
import { signIn } from "@/lib/auth";

export async function loginApiServer(provider: "google" | "github") {
    await signIn(provider);
}