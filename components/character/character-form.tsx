"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Character } from "./character-card"

interface CharacterFormProps {
  onAdd: (character: Omit<Character, "id">) => void
}

const MODELS = [
  // Original Models
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "mixtral-8x7b", name: "Mixtral", provider: "Groq" },
  
  // Z.AI Models
  { id: "glm-4.7", name: "GLM-4.7", provider: "Z.AI" },
]

const COLORS = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-violet-500",
  "from-orange-500 to-amber-500",
]

export function CharacterForm({ onAdd }: CharacterFormProps) {
  const [name, setName] = useState("")
  const [personality, setPersonality] = useState("")
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !personality.trim()) {
      setError("Please provide both a name and a personality.")
      return
    }

    const selectedModelData = MODELS.find(m => m.id === selectedModel)
    
    onAdd({
      name: name.trim(),
      personality: personality.trim(),
      model: selectedModel,
      provider: selectedModelData?.provider || "OpenAI",
      color: selectedColor,
    })

    // Reset form
    setName("")
    setPersonality("")
    setError("")
    setSelectedColor(COLORS[Math.floor(Math.random() * COLORS.length)])
  }

  return (
    <Card className="border-slate-200 bg-white/90 backdrop-blur-md">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Name</Label>
          <Input 
            placeholder="e.g. The Sarcastic Robot" 
            value={name} 
            onChange={(e) => {
              setName(e.target.value)
              if (error) setError("")
            }}
            className={`bg-white text-slate-900 placeholder:text-slate-400 focus:bg-white ${error && !name.trim() ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-indigo-500"}`}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Personality</Label>
          <textarea 
            className={`flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 ${error && !personality.trim() ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-indigo-500"}`}
            placeholder="Describe how this bot behaves..."
            value={personality}
            onChange={(e) => {
              setPersonality(e.target.value)
              if (error) setError("")
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Model</Label>
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 text-slate-900 shadow-sm transition-colors cursor-pointer"
          >
            {MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 mt-4">
          <Label className="text-slate-700 font-semibold">Theme Color</Label>
          <div className="flex gap-3 pt-1 pl-1">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} transition-all shadow-sm ${
                  selectedColor === color 
                    ? "ring-2 ring-indigo-500 ring-offset-2 scale-110" 
                    : "hover:scale-110 opacity-80 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm font-medium text-red-500 animate-in fade-in">{error}</p>
        )}
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 transition-opacity hover:opacity-90"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Add Character
        </Button>
      </CardContent>
    </Card>
  )
}
