// In @modules/products/components/image-gallery.tsx
'use client'

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]?.url || null)

  return (
    <div className="flex flex-col gap-y-4">
      {/* Main Featured Image */}
      <div className="relative size-[400px] rounded-lg shadow-md">
        {activeImage && (
          <Image
            src={activeImage}
            alt="Main product image"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => image.url && setActiveImage(image.url)}
              className={clx(
                "relative aspect-square w-full overflow-hidden rounded-md transition-transform hover:scale-105",
                {
                  "border-2 border-brand-purple shadow-lg": image.url === activeImage,
                  "border border-gray-200": image.url !== activeImage,
                }
              )}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${image.id}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery