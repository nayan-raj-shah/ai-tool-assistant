import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default async function proxy(req: NextRequest) {
    let url;
    const pathname = req.nextUrl.pathname;
    const session = await auth();
    if (session && (pathname === "/login" || pathname === "/")) {
        url = req.nextUrl.clone();
        url.pathname = "/chat";
    }
    else if (!session && pathname !== "/login") {
        url = req.nextUrl.clone();
        url.pathname = "/login";
    }
    if(url){
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
