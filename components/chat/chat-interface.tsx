"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Message, MessageBubble } from "@/components/chat/message-bubble"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Send, Bot } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface ChatInterfaceProps {
  messages: Message[]
  isGenerating: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onUserMessage: (msg: string) => void
}

export function ChatInterface({ 
  messages, 
  isGenerating, 
  onStart, 
  onPause, 
  onReset,
  onUserMessage 
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return
    onUserMessage(inputValue)
    setInputValue("")
  }

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-4xl mx-auto border-slate-200 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden">
      {/* Header / Controls */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full shadow-sm ${isGenerating ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
          <span className="text-sm font-medium text-slate-600">
            {isGenerating ? "Conversation Active..." : "Paused"}
          </span>
        </div>
        <div className="flex gap-2">
          {isGenerating ? (
            <Button size="sm" variant="destructive" onClick={onPause} className="h-8 shadow-sm transition-opacity hover:opacity-90">
              <Pause className="w-4 h-4 mr-1" /> Pause
            </Button>
          ) : (
            <Button size="sm" variant="default" onClick={onStart} className="h-8 bg-green-600 text-white shadow-sm transition-opacity hover:opacity-90 hover:bg-green-600">
              <Play className="w-4 h-4 mr-1" /> Start
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onReset} className="h-8 border-slate-200 text-slate-700 transition-opacity hover:opacity-80 hover:bg-transparent">
            <RefreshCw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col min-h-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
              <Bot className="w-16 h-16 mb-4 opacity-50 text-slate-300" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                isUser={msg.role === "user"} 
              />
            ))
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area (Optional / for Interjection) */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-200">
        <div className="flex gap-2">
          <Input 
            placeholder="Interject or set topic..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isGenerating}
            className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim() || isGenerating} size="icon" variant="secondary" className="bg-slate-200 text-slate-700 transition-opacity hover:opacity-80 hover:bg-slate-200">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
