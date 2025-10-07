import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate = ({ product, region, countryCode }: ProductTemplateProps) => {

  if (!product || !product.id) {
    return notFound()
  }

  const handleThumbnailClick = () => {

  }

  return (
    <>
      <div
        className="content-container flex flex-col items-center py-6 md:py-12 bg-cream-gradient"
        data-testid="product-container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 w-full">
          {/* Image Gallery Column */}
          {/* This div is now the scroll target and is only sticky on desktop */}
          <div
            className="md:sticky md:top-20 md:self-start flex flex-col items-center"
          >
            <ImageGallery
              images={product.images || []}
            />
          </div>

          {/* Product Info & Actions Column */}
          <div className="flex flex-col gap-y-6 md:gap-y-8">
            <ProductInfo product={product} />
            <ProductTabs product={product} />
            <div className="sticky flex flex-col gap-y-4">
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div
        className="content-container my-16 md:my-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate