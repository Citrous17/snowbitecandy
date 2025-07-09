import React, { Suspense } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import QuickBuyButton from "@modules/products/templates/QuickBuyButton"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate = ({
  product,
  region,
  countryCode,
}: ProductTemplateProps) => {
  if (!product || !product.id) return notFound()

  return (
    <>
      <div className="w-full flex flex-col items-start py-6 relative " data-testid="product-container">
        <div className="flex flex-row items-start relative w-full ">
          {/* Image Section */}
          <div className="w-1/3 px-4 relative">
            <ImageGallery images={product?.images || []} />
          </div>

          {/* Info Section */}
          <div className="w-full flex flex-col">
            {/* Quick Buy Button */}
            <QuickBuyButton />

            <div className="flex flex-col sticky " >
              <ProductInfo product={product} />
            </div>

            {/* Desktop View */}
            <div className="w-full hidden sm:block">
              <div className="flex w-full flex-col gap-8 mt-8">
                <ProductOnboardingCta />
                <div className="flex flex-col sticky top-48 py-8 gap-y-12 w-full">
                  <Suspense fallback={<ProductActions disabled product={product} region={region} />}>
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="w-full block sm:hidden">
          <div id="product-onboarding" className="flex w-full flex-col gap-8 mt-8">
            <div className="flex flex-col sticky top-48 py-8 gap-y-12 w-full">
              <Suspense fallback={<ProductActions disabled product={product} region={region} />}>
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="content-container my-8 small:my-32" data-testid="related-products-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
