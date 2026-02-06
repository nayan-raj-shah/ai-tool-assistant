"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const schema = z.object({
    message: z.string().min(1, "Message cannot be empty"),
});

type FormValues = z.infer<typeof schema>;

export default function ChatInput({
    onSend,
    isLoading,
}: {
    onSend: (message: string) => Promise<void>;
    isLoading: boolean;
}) {
    const { register, handleSubmit, reset, getValues } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { message: "" },
    });

    async function submit(values: FormValues) {
        await onSend(values.message);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="border-t p-4">
            <div className="flex gap-2 px-28">
                <Textarea
                    {...register("message")}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submit({ message: getValues("message") });
                        }
                    }}
                    disabled={isLoading}
                    rows={2}
                    placeholder="Ask something..."
                />

                <Button type="submit" disabled={isLoading}>
                    Send
                </Button>
            </div>
        </form>
    );
}