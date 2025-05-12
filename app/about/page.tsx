"use client"

import { HeroBackground } from "@/components/hero-background"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeProvider } from "@/components/theme-provider"
import GalleryFooter from "@/components/gallery-footer"
import GalleryHeader from "@/components/gallery-header"
import Logo from "@/components/logo"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Mail, MapPin, Phone, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <ThemeProvider>
      <div className="relative">
        <HeroBackground />
        <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
          {/* Десктопный хедер - скрывается на мобильных устройствах */}
          <div className="hidden md:block">
            <GalleryHeader searchQuery="" onSearchChange={() => {}} />
          </div>

          <main className="flex-grow mb-6 pb-12 md:pb-6">
            <div className="max-w-4xl mx-auto mt-16">
              <div className="flex flex-col items-center mb-12">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-full blur opacity-30"></div>
                  <Logo className="h-28 mb-4 relative" />
                </div>
                <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600">
                  О проекте
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-1 bg-gradient-to-r from-red-500 to-orange-600"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-red-500/10 mr-4">
                        <BookOpen className="h-6 w-6 text-red-500" />
                      </div>
                      <h2 className="text-2xl font-semibold">О Диктанте Победы</h2>
                    </div>
                    <p className="text-muted-foreground">
                      "Диктант Победы" - это международная историческая акция, которая проводится в целях повышения
                      исторической грамотности и патриотического воспитания молодежи, а также формирования уважительного
                      отношения к отечественной истории и сохранения памяти о Великой Отечественной войне.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-1 bg-gradient-to-r from-red-500 to-orange-600"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-red-500/10 mr-4">
                        <Award className="h-6 w-6 text-red-500" />
                      </div>
                      <h2 className="text-2xl font-semibold">Наша миссия</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Сохранение исторической памяти о Великой Отечественной войне и предоставление удобного доступа к
                      сертификатам участников акции "Диктант Победы". Мы стремимся сделать историческое наследие
                      доступным для всех и способствовать патриотическому воспитанию молодежи.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="overflow-hidden border shadow-lg mb-12">
                <div className="h-1 bg-gradient-to-r from-red-500 to-orange-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-red-500/10 mr-4">
                      <Users className="h-6 w-6 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-semibold">О галерее сертификатов</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Галерея сертификатов "Диктант Победы" - это цифровой архив, созданный для хранения и демонстрации
                    сертификатов участников международной акции "Диктант Победы". Наша платформа предоставляет удобный
                    доступ к сертификатам и позволяет быстро найти нужный документ.
                  </p>
                  <p className="text-muted-foreground">
                    Мы постоянно работаем над улучшением функциональности и удобства использования нашей галереи, чтобы
                    сделать процесс поиска и просмотра сертификатов максимально комфортным для всех пользователей.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border shadow-lg">
                <div className="h-1 bg-gradient-to-r from-red-500 to-orange-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-red-500/10 mr-4">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-semibold">Контакты</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-red-500 mr-3" />
                      <p className="text-muted-foreground">г. Минск, ул. Народная, 21</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-red-500 mr-3" />
                      <p className="text-muted-foreground">+375 (17) 395-55-92 </p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-red-500 mr-3" />
                      <p className="text-muted-foreground">minsk@rgsu.net</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          <GalleryFooter />
        </div>

        {/* Мобильное меню внизу экрана */}
        <MobileMenu searchQuery="" onSearchChange={() => {}} />
      </div>
    </ThemeProvider>
  )
}
