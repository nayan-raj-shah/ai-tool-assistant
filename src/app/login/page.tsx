"use client";

import { Button } from "@/components/ui/button";
import { loginApiServer } from "./loginApiServer";

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col gap-2">
                <Button onClick={() => loginApiServer("google")}>
                    Sign in with Google
                </Button>
                -------------- OR --------------
                <Button variant="outline" onClick={() => loginApiServer("github")}>
                    Sign in with GitHub
                </Button>
            </div>
        </div>
    );
}