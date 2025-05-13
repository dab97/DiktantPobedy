// Добавляем типы для Яндекс Карт
interface Window {
  ymaps?: {
    ready: (callback: () => void) => void
    Map: new (
      element: string | HTMLElement,
      options: {
        center: number[]
        zoom: number
        controls: string[]
      },
    ) => any
    Placemark: new (
      coordinates: number[],
      properties: {
        balloonContent: string
      },
      options: {
        preset: string
      },
    ) => any
  }
}
