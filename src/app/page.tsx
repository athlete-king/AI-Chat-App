import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";
import { cn } from "@/lib/utils";

const messages = [
  {
    id: "1",
    message: "Nice to meet you.",
    role: "user"
  },
  {
    id: "2",
    message: "Nice to meet you, too.",
    role: "assistant"
  },
  {
    id: "3",
    message: "Nice to meet you.",
    role: "user"
  },
  {
    id: "4",
    message: "Nice to meet you, too.",
    role: "assistant"
  },
  {
    id: "5",
    message: "Nice to meet you.",
    role: "user"
  },
  {
    id: "6",
    message: "Nice to meet you, too.",
    role: "assistant"
  },
]

export default function Home() {
  return (
    <div className={cn(
      'w-[100%] flex justify-center'
    )}>
      <div className={cn(
        'w-[40%]',
        'fixed bottom-0'
      )}>
        <MessageList messages={messages}/>
        <ChatInput />
        </div>
    </div>
  )    
}
