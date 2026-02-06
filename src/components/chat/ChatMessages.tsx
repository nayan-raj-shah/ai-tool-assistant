"use client";

import MessageBubble from "./MessageBubble";

export default function ChatMessages() {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-muted/40">
            <MessageBubble role="assistant" content="Hi! How can I help you today?" />
            <MessageBubble role="user" content="What’s the weather in Paris?" />
        </div>
    );
}