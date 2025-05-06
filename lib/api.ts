import type { Image } from "@/types/image"
import fs from "fs/promises"
import path from "path"

// Функция для получения изображений из локальной папки certificates
export async function fetchImages(): Promise<Image[]> {
  try {
    // Получаем список файлов из папки certificates
    const certificatesDir = path.join(process.cwd(), "public", "certificates")

    // Проверяем существование директории
    try {
      await fs.access(certificatesDir)
    } catch (error) {
      console.warn("Директория certificates не найдена, используем демо-данные")
      return getDemoImages()
    }

    // Получаем список файлов
    const files = await fs.readdir(certificatesDir)

    // Фильтруем только изображения
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    const imageFiles = files.filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))

    // Формируем массив изображений (без логотипа)
    const images: Image[] = imageFiles.map((file, index) => ({
      id: `image-${index + 1}`,
      title: file.split(".")[0] || `Сертификат ${index + 1}`,
      url: `/certificates/${file}`,
      description: `Сертификат ${index + 1}`,
    }))

    // Сортируем по фамилии
    return images.sort((a, b) => {
      const surnameA = extractSurname(a.title) || ""
      const surnameB = extractSurname(b.title) || ""
      return surnameA.localeCompare(surnameB, "ru")
    })
  } catch (error) {
    console.error("Ошибка при получении изображений:", error)
    // В случае ошибки возвращаем демо-данные
    return getDemoImages()
  }
}

// Функция для извлечения фамилии из строки
function extractSurname(text: string): string | null {
  // Предполагаем, что фамилия - это первое слово в строке
  const match = text.match(/^(\S+)/)
  return match ? match[1] : null
}

// Функция для получения демо-данных (без логотипа)
function getDemoImages(): Image[] {
  return [
    // Пример сертификата
    {
      id: "certificate-example",
      title: "Черник Александр Александрович",
      url: "/certificates/certificate-example.png",
      description: "Сертификат Черник А.А.",
    },
    // Примеры изображений для демонстрации в вертикальном формате с фамилиями
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `image-${i + 1}`,
      title: `${["Иванов", "Петров", "Сидоров", "Александров", "Михайлов", "Николаев", "Федоров", "Смирнов", "Кузнецов", "Соколов"][i]} Имя Отчество`,
      url: `/placeholder.svg?height=700&width=500&text=Сертификат ${i + 1}`,
      description: `Сертификат ${["Иванов", "Петров", "Сидоров", "Александров", "Михайлов", "Николаев", "Федоров", "Смирнов", "Кузнецов", "Соколов"][i]} И.О.`,
    })),
  ].sort((a, b) => {
    const surnameA = extractSurname(a.title) || ""
    const surnameB = extractSurname(b.title) || ""
    return surnameA.localeCompare(surnameB, "ru")
  })
}

// Функция для поиска изображений
export async function searchImages(query: string): Promise<Image[]> {
  const images = await fetchImages()

  if (!query.trim()) {
    return images
  }

  return images.filter(
    (image) =>
      image.title.toLowerCase().includes(query.toLowerCase()) ||
      (image.description && image.description.toLowerCase().includes(query.toLowerCase())),
  )
}
