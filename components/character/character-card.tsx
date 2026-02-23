import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Bot } from "lucide-react"

export interface Character {
  id: string
  name: string
  personality: string
  model: string
  provider: string
  color: string
}

interface CharacterCardProps {
  character: Character
  onDelete: (id: string) => void
  onEdit?: (character: Character) => void
}

export function CharacterCard({ character, onDelete, onEdit }: CharacterCardProps) {
  return (
    <Card className="relative group overflow-hidden border-slate-200 bg-white/90 hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-gradient-to-br ${character.color} shadow-md`}>
            <Bot className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl text-slate-800">{character.name}</CardTitle>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500">
          {onEdit && (
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-400" onClick={() => onEdit(character)}>
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-400" onClick={() => onDelete(character.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="mb-4">
          <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-full border border-slate-200 shadow-sm">
            {character.provider} / {character.model}
          </span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-3">
          {character.personality}
        </p>
      </CardContent>
    </Card>
  )
}
