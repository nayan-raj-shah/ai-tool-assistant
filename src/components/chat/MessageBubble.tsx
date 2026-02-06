import { cn } from "@/lib/utils";

export default function MessageBubble({
    role,
    content,
}: {
    role: "user" | "assistant";
    content: string;
}) {
    const isUser = role === "user";

    return (
        <div
            className={cn(
                "w-fit max-w-[75%] whitespace-pre-wrap rounded-lg px-4 py-2 text-sm",
                isUser
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-background border"
            )}
        >
            {content}
        </div>
    );
}