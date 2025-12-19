'use client'

import { cn } from '@/lib/utils';

const MessageBox = ({
    messageId,
    role,
    message,
    date
}: {
    messageId?: string,
    role: string,
    message: string,
    date?: string
}) => {

    return (
        <div
            className={cn(
                "flex",
                role === "user" ? "justify-end" : "justify-start",
                "mb-4"
            )}
        >
            <div
                className={cn(
                    "rounded-lg p-3 max-w-xs",
                    role === "user" ? 
                        "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
                )}
            >
                <p className='text-sm'>{ message }</p>
            </div>
        </div>
    )
}

export { MessageBox }