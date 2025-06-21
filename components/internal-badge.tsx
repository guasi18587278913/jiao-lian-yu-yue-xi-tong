import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

export function InternalBadge() {
  return (
    <Badge className="bg-yellow-400 text-black hover:bg-yellow-400 mb-4 font-semibold">
      <Building2 className="w-3 h-3 mr-1" />
      内部专用
    </Badge>
  )
}
