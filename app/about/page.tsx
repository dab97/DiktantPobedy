"use client";

import { useEffect, useState } from "react";
import { HeroBackground } from "@/components/hero-background";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeProvider } from "@/components/theme-provider";
import GalleryFooter from "@/components/gallery-footer";
import GalleryHeader from "@/components/gallery-header";
import Logo from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Mail,
  MapPin,
  Phone,
  Users,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Script from "next/script";

export default function AboutPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const coordinates = [53.874439, 27.620805]; // Координаты Минска (примерные)
  const address = "г. Минск, ул. Народная, 21";

  // Инициализация карты после загрузки скрипта
  useEffect(() => {
    if (!mapLoaded || typeof window.ymaps === "undefined") return;

    // Создаем карту
    const initMap = () => {
      try {
        const map = new window.ymaps.Map("map", {
          center: coordinates,
          zoom: 16,
          controls: ["zoomControl", "fullscreenControl"],
        });

        // Создаем метку
        const placemark = new window.ymaps.Placemark(
          coordinates,
          {
            balloonContent: `<strong>Филиал РГСУ в городе Минске</strong><br>${address}`,
          },
          {
            preset: "islands#redDotIcon",
          }
        );

        map.geoObjects.add(placemark);
        placemark.balloon.open();
      } catch (error) {
        console.error("Ошибка при инициализации карты:", error);
      }
    };

    // Инициализируем карту после загрузки API
    if (window.ymaps && window.ymaps.ready) {
      window.ymaps.ready(initMap);
    }
  }, [mapLoaded, coordinates, address]);

  // Функция для открытия Яндекс Навигатора
  const openYandexNavigator = () => {
    const url = `yandexnavi://build_route_on_map?lat_to=${coordinates[0]}&lon_to=${coordinates[1]}`;
    const webUrl = `https://yandex.ru/maps/app/?build_route=true&rtext=~${coordinates[0]},${coordinates[1]}`;

    // Пробуем открыть приложение, если не получается - открываем веб-версию
    window.location.href = url;

    // Открываем веб-версию через небольшую задержку, если приложение не открылось
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 500);
  };

  return (
    <ThemeProvider>
      <div className="relative">
        <HeroBackground />

        {/* Загрузка Яндекс Карт */}
        <Script
          src="https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU"
          onLoad={() => setMapLoaded(true)}
          strategy="lazyOnload"
        />

        <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
          {/* Десктопный хедер - скрывается на мобильных устройствах */}
          <div className="hidden md:block">
            <GalleryHeader searchQuery="" onSearchChange={() => {}} />
          </div>

          <main className="flex-grow mb-6 pb-20 md:pb-6">
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex flex-col items-center mb-12">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-full blur opacity-30"></div>
                  <Logo className="h-28 mb-4 relative" />
                </div>
                <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-500 font-victory">
                  О проекте
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-amber-500 rounded-full mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-2 bg-gradient-to-r from-red-600 to-amber-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-red-600/10 mr-4">
                        <BookOpen className="h-6 w-6 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-semibold font-redoctober">
                        О Диктанте Победы
                      </h2>
                    </div>
                    <p className="text-muted-foreground font-metapro">
                      "Диктант Победы" - это международная историческая акция,
                      которая проводится в целях повышения исторической
                      грамотности и патриотического воспитания молодежи, а также
                      формирования уважительного отношения к отечественной
                      истории и сохранения памяти о Великой Отечественной войне.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-2 bg-gradient-to-r from-red-600 to-amber-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-red-600/10 mr-4">
                        <Award className="h-6 w-6 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-semibold font-redoctober">
                        Наша миссия
                      </h2>
                    </div>
                    <p className="text-muted-foreground font-metapro">
                      Сохранение исторической памяти о Великой Отечественной
                      войне и предоставление удобного доступа к сертификатам
                      участников акции "Диктант Победы". Мы стремимся сделать
                      историческое наследие доступным для всех и способствовать
                      патриотическому воспитанию молодежи.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="overflow-hidden border-none shadow-lg mb-12">
                <div className="h-2 bg-gradient-to-r from-red-600 to-amber-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-red-600/10 mr-4">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold font-redoctober">
                      О галерее сертификатов
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4 font-metapro">
                    Галерея сертификатов "Диктант Победы" - это цифровой архив,
                    созданный для хранения и демонстрации сертификатов
                    участников международной акции "Диктант Победы". Наша
                    платформа предоставляет удобный доступ к сертификатам и
                    позволяет быстро найти нужный документ.
                  </p>
                  <p className="text-muted-foreground font-metapro">
                    Мы постоянно работаем над улучшением функциональности и
                    удобства использования нашей галереи, чтобы сделать процесс
                    поиска и просмотра сертификатов максимально комфортным для
                    всех пользователей.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg mb-12">
                <div className="h-2 bg-gradient-to-r from-red-600 to-amber-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-red-600/10 mr-4">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold font-redoctober">
                      Контакты
                    </h2>
                  </div>
                  <div className="space-y-4 mb-6 font-metapro">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-red-600 mr-3" />
                      <p className="text-muted-foreground">
                        г. Минск, ул. Народная, 21
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-red-600 mr-3" />
                      <p className="text-muted-foreground">
                        +375 (17) 222-33-44
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-red-600 mr-3" />
                      <p className="text-muted-foreground">info@rgsu.by</p>
                    </div>
                  </div>

                  {/* Яндекс Карта */}
                  <div className="mt-6">
                    <div
                      id="map"
                      className="w-full h-[300px] rounded-lg overflow-hidden shadow-md bg-muted flex items-center justify-center"
                    >
                      {!mapLoaded && (
                        <div className="text-muted-foreground">
                          Загрузка карты...
                        </div>
                      )}
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
  );
}
