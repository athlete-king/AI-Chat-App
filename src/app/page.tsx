"use client";

import { useState, useCallback } from "react";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/type";

const initialMessages : Message[] = [];

export default function Home() {
	const [messages, setMessages] = useState(initialMessages);

	const sendMessage = useCallback(
		async (text: string) => {
			const userMsg = { id: String(Date.now()), message: text, role: "user" };
			setMessages((m) => [...m, userMsg]);

			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: [...messages, userMsg] }),
			});

			const data = await res.json();
			if (data?.assistant) {
				const assistantMsg = {
					id: String(Date.now() + 1),
					message: data.assistant,
					role: "assistant",
				};
				setMessages((m) => [...m, assistantMsg]);
			}
		},
		[messages]
	);

	return (
		<div className={cn("w-[100%] flex justify-center")}>
			<div className={cn("w-[45%]", "fixed bottom-10")}>
				<MessageList messages={messages} />
				<ChatInput onSend={sendMessage} />
			</div>
		</div>
	);
}
