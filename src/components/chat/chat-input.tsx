'use client'

import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChatInput = () => {
    
    return (
        <div className={cn(
            "w-[100%] flex justify-space"
        )}>   
            <Input 
                type={"input"}
                className="focus-visible:outline-none focus-visible:ring-0"
                placeholder="Please type here prompt content....."
            />
            <Button 
                variant="outline"
                className="cursor-pointer"   
            >
                <Upload />
            </Button>
        </div>
    )
}

export { ChatInput }