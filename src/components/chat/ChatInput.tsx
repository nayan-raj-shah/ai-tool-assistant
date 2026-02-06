"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const chatInputSchema = z.object({
    message: z
        .string()
        .min(1, "Message cannot be empty")
        .max(2000, "Message is too long"),
});

type ChatInputValues = z.infer<typeof chatInputSchema>;

export default function ChatInput() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ChatInputValues>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(values: ChatInputValues) {
        console.log("Send message:", values.message);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4">
            <div className="flex gap-2 px-28">
                <div className="flex-1">
                    <Textarea
                        {...register("message")}
                        placeholder="Ask about weather, F1 races, or stocks..."
                        rows={2}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />

                    {errors.message && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    Send
                </Button>
            </div>
        </form>
    );
}