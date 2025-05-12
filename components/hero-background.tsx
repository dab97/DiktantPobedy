"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeroBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Градиентный фон */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background to-background/80"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Сетка точек */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${
            theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          } 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Градиентные круги */}
      <div className="absolute -left-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" />
      <div className="absolute -bottom-1/4 -right-1/4 h-[50%] w-[50%] rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-[30%] w-[30%] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/5 blur-3xl" />

      {/* Анимированные линии */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-scan-horizontal" />
        <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent animate-scan-vertical" />
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-scan-horizontal" />
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent animate-scan-vertical" />
      </div>
    </div>
  )
}
