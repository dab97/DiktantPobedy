import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Сертификаты Диктанта Победы 2025 - Филиал РГСУ в городе Минске",
  description: "Сертификаты Диктанта Победы 2025 - Филиал РГСУ в городе Минске",    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Предзагрузка логотипа для быстрого отображения */}
        <link rel="icon" href="/favicon.png" />
        <link rel="preload" href="/logo.png" as="image" />
        <meta name="description" content="Сертификаты Диктанта Победы 2025 - Филиал РГСУ в городе Минске"/>
        <meta property="og:site_name" content="DiktantPobedy.vercel.app" />
        <meta property="og:title" content="Диктант Победы 2025" />
        <meta property="og:description" content="Сертификаты Диктанта Победы 2025 - Филиал РГСУ в городе Минске"/>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
