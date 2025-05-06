import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  try {
    // Путь к папке с сертификатами
    const certificatesDir = path.join(process.cwd(), "public", "certificates")

    // Проверяем существование директории
    try {
      await fs.access(certificatesDir)
    } catch (error) {
      console.warn("Директория certificates не найдена, используем демо-данные")
      return NextResponse.json(getDemoImages())
    }

    // Получаем список файлов
    const files = await fs.readdir(certificatesDir)

    // Фильтруем только изображения
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    const imageFiles = files.filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))

    // Формируем массив изображений (без логотипа)
    const images = imageFiles.map((file, index) => ({
      id: `image-${index + 1}`,
      title: file.split(".")[0] || `Сертификат ${index + 1}`,
      url: `/certificates/${file}`,
      description: `Сертификат ${index + 1}`,
    }))

    // Сортируем по фамилии
    return NextResponse.json(
      images.sort((a, b) => {
        const surnameA = extractSurname(a.title) || ""
        const surnameB = extractSurname(b.title) || ""
        return surnameA.localeCompare(surnameB, "ru")
      }),
    )
  } catch (error) {
    console.error("Ошибка при получении изображений:", error)
    return NextResponse.json({ error: "Не удалось получить изображения" }, { status: 500 })
  }
}

// Функция для извлечения фамилии из строки
function extractSurname(text: string): string | null {
  // Предполагаем, что фамилия - это первое слово в строке
  const match = text.match(/^(\S+)/)
  return match ? match[1] : null
}

// Функция для получения демо-данных (без логотипа)
function getDemoImages() {
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

  return [
    // Пример сертификата
    {
      id: "certificate-example",
      title: "Черник Александр Александрович",
      url: "/certificates/certificate-example.png",
      description: "Сертификат Черник А.А.",
    },
    // Примеры изображений для демонстрации в вертикальном формате с фамилиями
    ...surnames.map((surname, i) => ({
      id: `image-${i + 1}`,
      title: `${surname} Имя Отчество`,
      url: `/placeholder.svg?height=700&width=500&text=Сертификат ${i + 1}`,
      description: `Сертификат ${surname} И.О.`,
    })),
  ].sort((a, b) => {
    const surnameA = extractSurname(a.title) || ""
    const surnameB = extractSurname(b.title) || ""
    return surnameA.localeCompare(surnameB, "ru")
  })
}
