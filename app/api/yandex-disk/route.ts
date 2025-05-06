import { NextResponse } from "next/server"

// Этот API роут будет использоваться для получения изображений с Яндекс Диска
// В реальном приложении здесь будет логика для работы с API Яндекс Диска

export async function GET(request: Request) {
  try {
    // Здесь должна быть логика для получения изображений с Яндекс Диска
    // Для этого потребуется авторизация и работа с API Яндекс Диска

    // Пример ответа с данными
    const images = [
      {
        id: "logo",
        title: "Логотип",
        url: "/logo.png",
        description: "Логотип Диктант Победы",
      },
      // Примеры изображений для демонстрации
      ...Array.from({ length: 11 }, (_, i) => ({
        id: `image-${i + 1}`,
        title: `Изображение ${i + 1}`,
        url: `/placeholder.svg?height=500&width=500&text=Изображение ${i + 1}`,
        description: `Описание изображения ${i + 1}`,
      })),
    ]

    return NextResponse.json(images)
  } catch (error) {
    console.error("Ошибка при получении изображений с Яндекс Диска:", error)
    return NextResponse.json({ error: "Не удалось получить изображения" }, { status: 500 })
  }
}
