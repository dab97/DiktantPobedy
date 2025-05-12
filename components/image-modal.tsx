"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Image as ImageType } from "@/types/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ImageModalProps {
  image: ImageType
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  allImages: ImageType[]
}

export default function ImageModal({ image, onClose, onPrev, onNext, allImages }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  // Удаляем неиспользуемую переменную и эффект

  // Обработка клавиатурных событий
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    setIsLoading(true)

    // Добавляем обработчик клавиатурных событий
    window.addEventListener("keydown", handleKeyDown)

    // Автоматически скрываем элементы управления через 3 секунды
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearTimeout(timer)
    }
  }, [image, handleKeyDown])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = image.url
    link.download = image.title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenOriginal = () => {
    window.open(image.url, "_blank")
  }

  // Показать элементы управления при движении мыши
  const handleMouseMove = () => {
    setShowControls(true)
    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [])


  // Получаем текущий индекс изображения в массиве (для отображения номера)
  const currentIndex = allImages.findIndex((img) => img.id === image.id)
  const totalImages = allImages.length

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-100/75 to-white/78 backdrop-blur-[10px] dark:from-gray-800/75 dark:to-black/78"
      onMouseMove={handleMouseMove}
    >
      {/* Основной контейнер для изображения */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-full w-full absolute" />
          </div>
        )}

        <div className="relative max-h-screen max-w-full">
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.title}
            className="max-h-screen max-w-full object-contain rounded-lg"
            width={660}
            height={1400}
            blurDataURL="data:..."
            placeholder="blur"
            onLoad={() => setIsLoading(false)}
            priority
          />

          {/* Кнопки навигации внутри изображения */}
          <TooltipProvider>
            {/* Кнопка "Предыдущее изображение" - слева по центру */}
            <div
              className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-white/80"
                    onClick={onPrev}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Предыдущее изображение</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Кнопка "Следующее изображение" - справа по центру */}
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-white/80"
                    onClick={onNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Следующее изображение</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Группа кнопок в правом верхнем углу */}
            <div
              className={`absolute top-2 right-2 flex gap-2 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Кнопка "Открыть оригинал" */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-white/80"
                    onClick={handleOpenOriginal}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Открыть исходное изображение</p>
                </TooltipContent>
              </Tooltip>

              {/* Кнопка "Скачать" */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-white/80"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Скачать</p>
                </TooltipContent>
              </Tooltip>

              {/* Кнопка "Закрыть" */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-white/80"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Закрыть</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Информация о текущем изображении */}
            <div
              className={`absolute top-2 left-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm font-mono transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {currentIndex + 1} / {totalImages}
            </div>

            {/* Название изображения */}
            <div
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-light text-sm transition-opacity duration-300 max-w-[90%] ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-center truncate">{image.title}</p>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
