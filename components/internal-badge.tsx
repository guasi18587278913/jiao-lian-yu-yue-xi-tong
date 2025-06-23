import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

export function InternalBadge() {
  return (
    <Badge className="mb-2 transform-gpu border border-amber-300/80 bg-amber-200/80 p-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur-sm transition-all hover:bg-amber-200">
      <Building2 className="mr-1.5 h-4 w-4" />
      内部专用
    </Badge>
  )
}
