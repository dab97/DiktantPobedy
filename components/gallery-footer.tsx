"use client";

import { Instagram, Share2, TwitterIcon as TikTok } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaTelegram } from "react-icons/fa";

export default function GalleryFooter() {
  return (
    <footer className="py-4 border-t mt-auto mb-16 md:mb-0">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-center md:text-left">
          Филиал РГСУ в городе Минске
        </p>

        {/* Десктопная версия - показывать все иконки соцсетей */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://t.me/rgsuminsk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Telegram"
          >
            <FaTelegram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/rgsu_mf/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.tiktok.com/@rgsu_mf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="TikTok"
          >
            <TikTok className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
