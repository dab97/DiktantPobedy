"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"

interface GalleryHeaderProps {
  searchQuery: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function GalleryHeader({ searchQuery, onSearchChange }: GalleryHeaderProps) {
  return (    
    <header className="sticky top-0 z-40 backdrop-blur flex flex-col md:flex-row justify-between items-center transition-colors duration-500 lg:z-50 border border-slate-200 dark:border dark:border-slate-50/[0.06] dark:bg-black/80 bg-white/80 supports-backdrop-blur:bg-white/60 p-4 mb-4 gap-2 md:gap-4 shadow-md rounded-lg">
      <div className="flex items-center">
        <Logo className="h-10 mr-2 lg:mr-4 hidden md:inline-flex" />
        <h1 className="text-base lg:text-2xl font-bold">Сертификаты Диктанта Победы 2025</h1>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск сертификатов..."
            className="pl-8 focus-visible:ring-1 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
