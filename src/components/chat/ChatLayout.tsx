"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
    const { messages, status, sendMessage } = useChat();

    async function onSend(message: string) {
        await sendMessage({ text: message });
    }

    return (
        <div className="flex h-screen flex-col">
            <header className="border-b px-6 py-4 font-semibold">
                AI Tool Assistant
            </header>

            <ChatMessages messages={messages} isLoading={status === "streaming" || status === "submitted"} />

            <ChatInput
                onSend={onSend}
                isLoading={status === "streaming" || status === "submitted"}
            />
        </div>
    );
}