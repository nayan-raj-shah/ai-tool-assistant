import ChatLayout from "@/components/chat/ChatLayout";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export default async function ChatPage() {
    let initialMessages: any[] = [];
    const session = await auth();
    if (session && session.user && session.user.id) {
        const userId = session.user.id;
        const history = await db
            .select()
            .from(messages)
            .where(eq(messages.userId, userId))
            .orderBy(messages.createdAt);

        initialMessages = history.map((m) => ({
            id: m.id,
            role: m.role,
            parts: m.content
                ? [{ type: "text", text: m.content }]
                : [m.toolData],
        }));
    }

    return <ChatLayout initialMessages={initialMessages}/>;
}
