'use client'

import { cn } from '@/lib/utils';

import { MessageBox } from "./message-box";
import { type Message } from '@/lib/type';
import { TypingIndicator } from './typing-indicator';

const MessageList = ({
    messages,
    isLoading
}: {
    messages: Message[],
    isLoading?: boolean
}) => {
    
    return (
        <div className={cn(
            'w-[100%]'
        )}>
            {
                messages.map(item => {
                    return  <MessageBox 
                        role={item.role} 
                        message={item.message} 
                        key={item.id}
                    />
                })
            }
            {
                isLoading ? (
                    <div className="mb-4">
                        <div className={cn("flex justify-start")}> 
                            <TypingIndicator />
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export { MessageList }