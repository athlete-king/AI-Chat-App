'use client'

import { cn } from '@/lib/utils';

import { MessageBox } from "./message-box";
import { type Message } from '@/lib/type';

const MessageList = ({
    messages
}: {
    messages: Message[],
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
        </div>
    )
}

export { MessageList }