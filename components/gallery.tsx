"use client"

import type React from "react"
import ImageGrid from "@/components/image-grid"
import ImageModal from "@/components/image-modal"
import { useGallery } from "@/hooks/use-gallery"
import GalleryHeader from "@/components/gallery-header"
import GalleryFooter from "@/components/gallery-footer"

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
  } = useGallery()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="container mx-auto px-4 pt-4 flex flex-col min-h-screen">
      <GalleryHeader searchQuery={searchQuery} onSearchChange={handleSearch} />

      <main className="flex-grow mb-6">
        <ImageGrid images={filteredImages} isLoading={isLoading} onImageClick={handleImageClick} />
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
    </div>
  )
}
