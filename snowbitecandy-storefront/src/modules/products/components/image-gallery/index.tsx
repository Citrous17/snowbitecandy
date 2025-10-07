"use client"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]?.url)

  if (!images || images.length === 0) {
    return <div className="h-96 w-full bg-gray-200 animate-pulse rounded-lg" />
  }
  
  const handleThumbnailSelect = (url: string) => {
    setCurrentImage(url)
  }

  return (
    <div className="flex flex-col-reverse md:flex-col gap-y-4 w-full">
      {/* Main Image Display */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden">
        <Image
          src={currentImage || images[0].url}
          alt={`Product image`}
          fill
          className="object-cover object-center"
          priority={true}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail Toolbar: Becomes sticky on mobile */}
      <div className="sticky top-0 z-20 bg-white py-2 md:static md:bg-transparent">
        <div className="flex items-center justify-center gap-x-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailSelect(image.url)}
              className={`h-16 w-16 rounded-md border overflow-hidden transition-all ${
                currentImage === image.url
                  ? "border-gray-900 shadow-md"
                  : "border-gray-200"
              }`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="object-cover object-center w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageGallery