// ProductRail.tsx
// This is a Client Component as indicated by 'use client'
'use client'

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
  pricedProducts,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  pricedProducts: HttpTypes.StoreProduct[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const PRODUCTS_PER_PAGE = 5

  // Make sure pricedProducts is always an array to avoid any issues
  const products = Array.isArray(pricedProducts) ? pricedProducts : []
  
  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + PRODUCTS_PER_PAGE
  )

  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex + PRODUCTS_PER_PAGE < products.length

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="text-5xl font-fredoka">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setCurrentIndex((prev) => prev - PRODUCTS_PER_PAGE)}
          disabled={!canGoBack}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => prev + PRODUCTS_PER_PAGE)}
          disabled={!canGoForward}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-24 small:gap-y-36">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}