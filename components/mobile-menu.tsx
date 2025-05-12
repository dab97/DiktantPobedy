"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Search,
  Moon,
  Sun,
  Home,
  Info,
  Instagram,
  Share2,
  TwitterIcon as TikTok,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaTelegram } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MobileMenu({ searchQuery, onSearchChange }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Предотвращаем гидратацию
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Поисковая панель, которая появляется при нажатии на иконку поиска */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl">
          <SheetHeader className="mb-4">
            <SheetTitle>Поиск сертификатов</SheetTitle>
          </SheetHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Введите имя или фамилию..."
              className="pl-10 pr-2"
              value={searchQuery}
              onChange={onSearchChange}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 rounded-full"
                onClick={() => {
                  const resetEvent = {
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onSearchChange(resetEvent);
                }}
              >
                <span className="sr-only">Очистить</span>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Фиксированное меню внизу экрана */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background/75 backdrop-blur-lg rounded-t-2xl border-t border-slate-200 dark:border-slate-800 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="flex items-center justify-around p-2">
            {/* Кнопка "Главная" */}
            <Link
              href="/"
              className={cn(
                "flex flex-col items-center justify-center rounded-full transition-all duration-300",
                pathname === "/"
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Главная</span>
            </Link>

            {/* Кнопка "О нас" */}
            <Link
              href="/about"
              disabled
              className={cn(
                "flex flex-col items-center justify-center rounded-full transition-all duration-300",
                pathname === "/about"
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              <Info className="h-5 w-5" />
              <span className="text-xs mt-1">О нас</span>
            </Link>

            {/* Центральная кнопка поиска */}
            <button
              className="relative flex flex-col items-center justify-center -mt-5 transition-all duration-300"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Поиск"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-primary to-orange-600 shadow-lg flex items-center justify-center text-white transform hover:scale-110 active:scale-95 transition-all duration-300">
                <Search className="h-6 w-6" />
              </div>
              <span className="text-xs mt-1 text-primary font-medium">
                Поиск
              </span>
            </button>

            {/* Мобильная версия - выпадающее меню */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      "flex flex-col items-center justify-center rounded-full transition-all duration-300"
                    )}
                  >
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="not-sr-only text-xs mt-1 text-muted-foreground">
                      Сети
                    </span>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://t.me/rgsuminsk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FaTelegram className="h-4 w-4" />
                      <span>Telegram</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://www.instagram.com/rgsu_mf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Instagram</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://www.tiktok.com/@rgsu_mf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <TikTok className="h-4 w-4" />
                      <span>TikTok</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Кнопка переключения темы */}
            <button
              className="flex flex-col items-center justify-center rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground hover:scale-105"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={
                theme === "dark"
                  ? "Включить светлую тему"
                  : "Включить темную тему"
              }
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span className="text-xs mt-1">Светлая</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span className="text-xs mt-1">Темная</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
