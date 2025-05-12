"use client";

import type React from "react";
import ImageGrid from "@/components/image-grid";
import ImageModal from "@/components/image-modal";
import { useGallery } from "@/hooks/use-gallery";
import GalleryHeader from "@/components/gallery-header";
import GalleryFooter from "@/components/gallery-footer";
import { MobileMenu } from "@/components/mobile-menu";

export default function Gallery() {
  const {
    filteredImages,
    searchQuery,
    isLoading,
    selectedImage,
    setSearchQuery,
    handleImageClick,
    handleCloseModal,
    handlePrevImage,
    handleNextImage,
  } = useGallery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 md:p-0 flex flex-col min-h-screen">
      {/* Десктопный хедер - скрывается на мобильных устройствах */}
      <div className="hidden md:block">
        <GalleryHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />
      </div>

      <main className="flex-grow mb-6 pb-16 md:pb-0">
        <ImageGrid
          images={filteredImages}
          isLoading={isLoading}
          onImageClick={handleImageClick}
        />
      </main>

      <GalleryFooter />

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={handleCloseModal}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          allImages={filteredImages.filter((img) => !img.isLogo)}
        />
      )}
    {/* Мобильное меню внизу экрана */}
    <MobileMenu searchQuery={searchQuery} onSearchChange={handleSearch} />
    </div>
  );
}
