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
  
  // February 2026
  { id: "qwen/qwen3-vl-235b-a22b-thinking", name: "Qwen3 VL 235B", provider: "OpenRouter" },
  { id: "riverflow/riverflow-v2-pro", name: "Riverflow V2 Pro", provider: "OpenRouter" },
  { id: "riverflow/riverflow-v2-fast", name: "Riverflow V2 Fast", provider: "OpenRouter" },

  // January 2026
  { id: "stepfun/step-3.5-flash-free", name: "Step 3.5 Flash", provider: "OpenRouter" },
  { id: "arcee-ai/trinity-large-preview-free", name: "Trinity Large Preview", provider: "OpenRouter" },
  { id: "upstage/solar-pro-3-free", name: "Solar Pro 3", provider: "OpenRouter" },
  { id: "lfm/lfm-2.5-1.2b-thinking-free", name: "LFM2.5-1.2B-Thinking", provider: "OpenRouter" },
  { id: "lfm/lfm-2.5-1.2b-instruct-free", name: "LFM2.5-1.2B-Instruct", provider: "OpenRouter" },
  { id: "black-forest-labs/flux-2-klein-4b", name: "FLUX.2 Klein 4B", provider: "OpenRouter" },

  // December 2025
  { id: "seedream/seedream-4.5", name: "Seedream 4.5", provider: "OpenRouter" },
  { id: "black-forest-labs/flux-2-max", name: "FLUX.2 Max", provider: "OpenRouter" },

  // Free Models
  { id: "deepseek/deepseek-r1-chimera-free", name: "DeepSeek R1T2 Chimera", provider: "OpenRouter" },
  { id: "z-ai/glm-4.5-air-free", name: "GLM 4.5 Air", provider: "OpenRouter" },
  { id: "deepseek/deepseek-r1-t-chimera-free", name: "DeepSeek R1T Chimera", provider: "OpenRouter" },
  { id: "deepseek/deepseek-r1-0528-free", name: "R1 0528", provider: "OpenRouter" },
  { id: "nvidia/nemotron-3-nano-30b-a3b-free", name: "Nemotron 3 Nano 30B", provider: "OpenRouter" },
  { id: "openai/gpt-oss-120b-free", name: "gpt-oss-120b", provider: "OpenRouter" },
  { id: "meta-llama/llama-3.3-70b-instruct-free", name: "Llama 3.3 70B Instruct", provider: "OpenRouter" },
  { id: "arcee-ai/trinity-mini-free", name: "Trinity Mini", provider: "OpenRouter" },
  { id: "deepseek/deepseek-r1-free", name: "DeepSeek R1", provider: "OpenRouter" },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !personality) return

    const selectedModelData = MODELS.find(m => m.id === selectedModel)
    
    onAdd({
      name,
      personality,
      model: selectedModel,
      provider: selectedModelData?.provider || "OpenAI",
      color: selectedColor,
    })

    // Reset form
    setName("")
    setPersonality("")
    setSelectedColor(COLORS[Math.floor(Math.random() * COLORS.length)])
  }

  return (
    <Card className="border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Name</Label>
          <Input 
            placeholder="e.g. The Sarcastic Robot" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Personality</Label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900"
            placeholder="Describe how this bot behaves..."
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
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
