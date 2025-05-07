"use client"

import { useState } from "react"
import Image from "next/image"
import type { Image as ImageType } from "@/types/image"
import { Skeleton } from "@/components/ui/skeleton"
import EmptyState from "@/components/empty-state"

interface ImageGridProps {
  images: ImageType[]
  isLoading: boolean
  onImageClick: (image: ImageType) => void
}

export default function ImageGrid({ images, isLoading, onImageClick }: ImageGridProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="aspect-[3/4] relative rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <EmptyState
        title="Ничего не найдено по вашему запросу"
        description="Попробуйте изменить параметры поиска или проверьте правильность написания."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => {
        const isLogo = image.isLogo

        return (
          <div
            key={image.id}
            className={`relative rounded-lg overflow-hidden ${isLogo ? "dark:border dark:border-destructive" : "cursor-pointer group"}`}
            onClick={() => onImageClick(image)}
          >
            {!loadedImages[image.id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Skeleton className="h-full w-full absolute" />
              </div>
            )}
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              width={364} // Добавлено: явное указание ширины
              height={515} // Добавлено: явное указание высоты
              quality={75} // Изменено: снижено качество для ускорения загрузки
              loading="lazy" // Оставлено: ленивая загрузка
              priority={false} // Добавлено: явное отключение приоритетной загрузки
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Уточнены брейкпоинты
              placeholder="blur" // Оставлено: размытый плейсхолдер
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==" // Простой плейсхолдер
              className={`object-cover transition-all duration-300 ${
                !isLogo ? "group-hover:scale-105" : ""
              } ${loadedImages[image.id] ? "opacity-100" : "opacity-0"}`}
              onLoad={() => handleImageLoad(image.id)}              
            />
            {!isLogo && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-3 text-white w-full">
                  <h3 className="text-sm font-medium truncate text-center">{image.title}</h3>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}