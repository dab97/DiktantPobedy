"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Image } from "@/types/image"

// Функция для извлечения фамилии из строки
export const extractSurname = (text: string): string | null => {
  // Предполагаем, что фамилия - это первое слово в строке
  const match = text.match(/^(\S+)/)
  return match ? match[1] : null
}

export function useGallery() {
  const [images, setImages] = useState<Image[]>([])
  const [filteredImages, setFilteredImages] = useState<Image[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const { toast } = useToast()

  // Загрузка изображений
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true)
        // Получаем все изображения
        const response = await fetch("/api/images")
        if (!response.ok) {
          throw new Error("Ошибка при загрузке изображений")
        }
        const data = await response.json()

        // Добавляем логотип как первое изображение в галерее
        const allImages = [
          {
            id: "logo",
            title: "Логотип",
            url: "/logo.png",
            description: "Логотип Диктант Победы",
            isLogo: true,
          },
          ...data,
        ]

        // Сортируем сертификаты по фамилии (кроме логотипа)
        const sortedImages = [
          allImages[0], // Логотип всегда первый
          ...allImages.slice(1).sort((a, b) => {
            const surnameA = extractSurname(a.title) || ""
            const surnameB = extractSurname(b.title) || ""
            return surnameA.localeCompare(surnameB, "ru")
          }),
        ]

        setImages(sortedImages)
        setFilteredImages(sortedImages)
      } catch (error) {
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить изображения из папки certificates",
          variant: "destructive",
        })
        // Используем демо-данные в случае ошибки
        const demoImages = getDemoImages()
        setImages(demoImages)
        setFilteredImages(demoImages)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [toast])

  // Фильтрация изображений при поиске
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredImages(images)
    } else {
      const filtered = images.filter(
        (image) =>
          image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (image.description && image.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredImages(filtered)
    }
  }, [searchQuery, images])

  // Обработчики для модального окна
  const handleImageClick = (image: Image) => {
    if (image.isLogo) return
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const handlePrevImage = () => {
    if (!selectedImage) return
    const certificatesOnly = filteredImages.filter((img) => !img.isLogo)
    const currentIndex = certificatesOnly.findIndex((img) => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + certificatesOnly.length) % certificatesOnly.length
    setSelectedImage(certificatesOnly[prevIndex])
  }

  const handleNextImage = () => {
    if (!selectedImage) return
    const certificatesOnly = filteredImages.filter((img) => !img.isLogo)
    const currentIndex = certificatesOnly.findIndex((img) => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % certificatesOnly.length
    setSelectedImage(certificatesOnly[nextIndex])
  }

  return {
    images,
    filteredImages,
    searchQuery,
    isLoading,
    selectedImage,
    setSearchQuery,
    handleImageClick,
    handleCloseModal,
    handlePrevImage,
    handleNextImage,
  }
}

// Функция для получения демо-данных
function getDemoImages(): Image[] {
  const surnames = [
    "Иванов",
    "Петров",
    "Сидоров",
    "Александров",
    "Михайлов",
    "Николаев",
    "Федоров",
    "Смирнов",
    "Кузнецов",
    "Соколов",
  ]

  // Логотип как первое изображение
  const logoImage: Image = {
    id: "logo",
    title: "Логотип",
    url: "/logo.png",
    description: "Логотип Диктант Победы",
    isLogo: true,
  }

  // Пример сертификата
  const exampleCertificate: Image = {
    id: "certificate-example",
    title: "Черник Александр Александрович",
    url: "/certificates/certificate-example.png",
    description: "Сертификат Черник А.А.",
  }

  // Другие примеры с фамилиями
  const demoImages = surnames.map((surname, i) => ({
    id: `image-${i + 1}`,
    title: `${surname} Имя Отчество`,
    url: `/placeholder.svg?height=700&width=500&text=Сертификат ${i + 1}`,
    description: `Сертификат ${surname} И.О.`,
  }))

  // Сортируем все изображения, кроме логотипа
  return [
    logoImage,
    exampleCertificate,
    ...demoImages.sort((a, b) => {
      const surnameA = extractSurname(a.title) || ""
      const surnameB = extractSurname(b.title) || ""
      return surnameA.localeCompare(surnameB, "ru")
    }),
  ]
}
