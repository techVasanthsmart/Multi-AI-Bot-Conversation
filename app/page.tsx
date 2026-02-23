"use client"

import { useState, useEffect } from "react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Character, CharacterCard } from "@/components/character/character-card"
import { CharacterForm } from "@/components/character/character-form"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Message } from "@/components/chat/message-bubble"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, MessageSquare, Play, RotateCcw } from "lucide-react"

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "The Hot-Head",
      personality: "Explodes over minor issues. Treats disagreements like battles.",
      model: "gpt-4o",
      provider: "OpenAI",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "2",
      name: "The Zen Master",
      personality: "Unbothered. Responds with philosophical quotes.",
      model: "gpt-4o",
      provider: "OpenAI",
      color: "from-blue-500 to-cyan-500"
    }
  ])
  
  const [topic, setTopic] = useState("")
  const [isChatStarted, setIsChatStarted] = useState(false)
  
  const [messages, setMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // API Integration Logic
  useEffect(() => {
    if (!isChatStarted || isPaused || isGenerating) return

    const interval = setInterval(async () => {
        if (characters.length === 0) return

        const randomChar = characters[Math.floor(Math.random() * characters.length)]
        
        // Find provider based on model or stored in character
        // We need to ensure character has provider info. 
        // For now, we'll try to guess or assume it's stored.
        // Actually, let's update Character interface to include provider.
        // For now, let's just pass the model and let backend fail or default if provider missing?
        // Better: Update Character type in next step.
        
        setIsGenerating(true)
        
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    history: messages.map(m => ({
                        role: m.role,
                        content: m.content,
                        senderName: m.senderName
                    })),
                    nextSpeaker: randomChar.name,
                    model: randomChar.model,
                    provider: randomChar.provider, 
                    systemPrompt: randomChar.personality
                })
            })
            
            if (!response.ok) throw new Error("API Call failed")
            
            const data = await response.json()
            
            const newMsg: Message = {
                id: Date.now().toString(),
                role: "assistant", // Logic treats bot response as assistant
                senderName: data.sender || randomChar.name,
                color: randomChar.color,
                content: data.content,
                timestamp: new Date()
            }
            
            setMessages(prev => [...prev, newMsg])
        } catch (error) {
            console.error("Chat Error:", error)
            // Optional: visual error feedback
        } finally {
            setIsGenerating(false)
        }

    }, 4000) // Slightly longer delay for network

    return () => clearInterval(interval)
  }, [isChatStarted, isPaused, isGenerating, characters, topic, messages])



  const addCharacter = (char: Omit<Character, "id">) => {
    setCharacters([...characters, { ...char, id: Date.now().toString() }])
  }

  const removeCharacter = (id: string) => {
    setCharacters(characters.filter(c => c.id !== id))
  }

  const startConversation = () => {
    if (characters.length < 2) return
    setIsChatStarted(true)
    setMessages([
      {
        id: "init",
        role: "user",
        senderName: "System",
        content: `Conversation started. Topic: ${topic || "General Chat"}`,
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight pb-2 mt-8">
              <span className="cosmic-gradient">Multi-AI Conversation</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Create a chaotic orchestra of distinct AI personalities and watch them interact.
            </p>
        </header>

        {!isChatStarted ? (
            /* SETUP MODE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Character List */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <BotIcon /> Characters ({characters.length})
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {characters.map(char => (
                            <CharacterCard 
                                key={char.id} 
                                character={char} 
                                onDelete={removeCharacter} 
                            />
                        ))}
                        {characters.length === 0 && (
                            <div className="col-span-full h-32 flex items-center justify-center border border-dashed border-slate-300 rounded-xl bg-slate-50">
                                <p className="text-slate-500">No characters added yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Start Controls */}
                    <div className="p-6 rounded-xl border border-slate-200/50 bg-gradient-to-r from-violet-100 to-fuchsia-100 backdrop-blur-md mt-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 w-full space-y-2">
                                <Label className="text-slate-700 font-semibold">Initial Topic / Context</Label>
                                <Input 
                                    placeholder="e.g. Why is pineapple on pizza controversial?" 
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="bg-white/90 border-slate-200 text-slate-800 placeholder:text-slate-400"
                                />
                            </div>
                            <Button 
                                size="lg" 
                                onClick={startConversation}
                                disabled={characters.length < 2}
                                className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-opacity"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Start Simulation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Character Form Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-8">
                         <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
                            <Sparkles className="text-amber-500" /> Define New Bot
                        </h2>
                        <CharacterForm onAdd={addCharacter} />
                    </div>
                </div>
            </div>
        ) : (
            /* CHAT MODE */
            <div className="space-y-6 max-w-5xl mx-auto mt-8">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setIsChatStarted(false)} className="text-slate-600 border border-slate-200 transition-opacity hover:opacity-80 hover:bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" /> Back to Setup
                    </Button>
                    <div className="px-4 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-sm text-sm text-slate-600">
                        Topic: <span className="text-slate-900 font-medium">{topic || "General"}</span>
                    </div>
                </div>

                <ChatInterface 
                    messages={messages}
                    isGenerating={isGenerating}
                    onStart={() => setIsPaused(false)}
                    onPause={() => setIsPaused(true)}
                    onReset={() => setMessages([])}
                    onUserMessage={(msg) => {
                        setMessages(prev => [...prev, {
                            id: Date.now().toString(),
                            role: "user",
                            senderName: "User",
                            content: msg,
                            timestamp: new Date()
                        }])
                    }}
                />
            </div>
        )}

      </div>
    </div>
  )
}

function BotIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
            <path d="m14 9 3 3-3 3" />
            <path d="m9 9-3 3 3 3" />
        </svg>
    )
}
