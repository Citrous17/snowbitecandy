'use client'

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import clsx from "clsx"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  const handleImageClick = (url: string) => {
    setFullscreenImage(url)
  }

  const handleOverlayClick = () => {
    setFullscreenImage(null)
  }

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle cursor-pointer"
              onClick={() => image.url && handleImageClick(image.url)}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </Container>
          )
        })}
      </div>

      {fullscreenImage && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out"
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={fullscreenImage}
              alt="Fullscreen Product Image"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
