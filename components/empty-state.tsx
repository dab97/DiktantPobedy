import { FrownIcon } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
}

export default function EmptyState({
  title = "Сертификаты не найдены",
  description = "Попробуйте изменить параметры поиска.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-xl mx-auto">
      <div className="w-[364.010px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 bg-muted">
        <div className="flex flex-col items-center h-[485.347px] justify-center">
          <div className="bg-destructive/10 rounded-full p-4 mb-4">
            <FrownIcon className="h-8 w-8 text-destructive/80" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-md">{description}</p>
        </div>
      </div>
    </div>
  )
}