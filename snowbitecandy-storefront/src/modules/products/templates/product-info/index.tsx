'use client'

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import clsx from "clsx"
import { useEffect } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [expanded, setExpanded] = useState(false)

  const shouldTruncate = !!product.description && product.description.length > 180

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 pt-4 w-full">
        {product.collection && (
          <div>
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="flex w-full bg-burgundy-90 text-white text-2xl lg:text-3xl px-6 ml-6 py-3 rounded-l-full shadow-md"
            >
              {product.collection.title}
            </LocalizedClientLink>
          </div>
        )}
        <Heading
          level="h2"
          className="text-4xl lg:text-6xl leading-10 text-fredoka"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div className="relative w-full">
          <Text
            className={clsx(
              "text-sm text-ui-fg-subtle whitespace-pre-line transition-all",
              {
                "line-clamp-none lg:text-md": expanded,
                "max-h-[6.5rem] overflow-hidden lg:text-2xl ": !expanded, // approx 3 lines
              }
            )}
            data-testid="product-description"
          >
            {!expanded && shouldTruncate ? (
              <>
                {product?.description?.slice(0, 180)}
                <span className="text-gray-400">...</span>
              </>
            ) : (
              product.description
            )}
          </Text>

          {/* Read more toggle */}
          {shouldTruncate && (
            <button
              className="flex justify-center text-red text-2xl border border-black rounded-lg p-4 bg-white font-semibold mt-8 hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </button>

          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
