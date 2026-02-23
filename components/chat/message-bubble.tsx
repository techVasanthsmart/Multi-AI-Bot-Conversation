import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  senderName: string
  color?: string
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
  isUser?: boolean
}

export function MessageBubble({ message, isUser }: MessageBubbleProps) {
  return (
    <div className={cn("flex w-full mb-4 px-4", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[80%] gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
        <div 
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg",
            isUser ? "bg-zinc-700" : `bg-gradient-to-br ${message.color || "from-gray-500 to-gray-600"}`
          )}
        >
          {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
        </div>
        
        <div className="flex flex-col gap-1 w-full max-w-[85%]">
          <span className={cn("text-xs font-semibold text-slate-500", isUser ? "text-right" : "text-left")}>
            {message.senderName}
          </span>
          <div 
            className={cn(
              "px-4 py-3 rounded-2xl text-[15px] shadow-sm whitespace-pre-wrap break-words leading-relaxed",
              isUser 
                ? "bg-indigo-600 text-white rounded-tr-sm border border-indigo-500" 
                : "bg-white text-slate-800 rounded-tl-sm border border-slate-200"
            )}
          >
            {message.content}
          </div>
        </div>
      </div>
    </div>
  )
}
