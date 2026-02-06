import { cn } from "@/lib/utils";

export default function MessageBubble({
    role,
    content,
}: {
    role: "system" | "user" | "assistant";
    content: string;
}) {
    const isUser = role === "user";
    return (
        <div
            className={cn(
                "w-fit max-w-[75%] whitespace-pre-wrap rounded-lg px-4 py-2",
                isUser
                    ? "ml-auto border"
                    : "mr-auto bg-background border"
            )}
        >
            {content}
        </div>
    );
}