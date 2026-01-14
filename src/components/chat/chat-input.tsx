'use client'

import { useState } from "react";
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChatInput({ onSend }: { onSend?: (text: string) => Promise<void> | void }) {
  const [text, setText] = useState("");

  async function handleSend(e?: React.FormEvent) {
    e && e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setText("");
    await onSend?.(t);
  }

  return (
    <form onSubmit={handleSend} className={cn(
        "w-[100%] flex justify-space"
    )}>
        <Input 
            type={"input"}
            className="focus-visible:outline-none focus-visible:ring-0"
            placeholder="Please type here prompt content....."
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <Button 
            variant="outline"
            className="cursor-pointer"   
            type="submit"
        >
            <Upload />
        </Button>
    </form>
  );
}