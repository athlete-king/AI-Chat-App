"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  message: string;
  role: "user" | "assistant" | string;
};

const initialMessages: Message[] = [];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: Message = { id: String(Date.now()), message: text, role: "user" };
      setMessages((m) => [...m, userMsg]);
      setIsLoading(true);

      const payload = { messages: [...messages, userMsg] };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_CLIENT_KEY ?? ""}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data?.assistant) {
          const assistantMsg: Message = {
            id: String(Date.now() + 1),
            message: data.assistant,
            role: "assistant",
          };
          setMessages((m) => [...m, assistantMsg]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <div className={cn("w-[100%] flex justify-center mt-5")}>
		<div className={cn("w-[45%] h-[95vh] flex flex-col rounded-md overflow-hidden")}>
			<div className={cn("flex-1 overflow-y-auto p-4 no-scrollbar")} 
				style={{ scrollBehavior: "smooth"}}
			>
        <MessageList messages={messages} isLoading={isLoading} />
				<div ref={bottomRef} />
			</div>
			<div>
				<ChatInput onSend={sendMessage} />
			</div>
		</div>
    </div>
  );
}
