"use client";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <header className="border-b px-6 py-4 font-semibold">
                AI Tool Assistant
            </header>

            {/* Messages */}
            <ChatMessages />

            {/* Input */}
            <ChatInput />
        </div>
    );
}