"use server"
import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { Suspense } from "react"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  const allWithProducts = await Promise.all(
    collections.map(async (collection) => {
      const {
        response: { products },
      } = await listProducts({
        regionId: region.id,
        queryParams: {
          collection_id: collection.id,
          fields: "*variants.calculated_price",
        },
      })

      return {
        collection,
        products: products || [],
      }
    })
  )

  return (
    <>
      {allWithProducts.map(({ collection, products }) => (
        <Suspense key={collection.id} fallback={<div>Loading collection...</div>}>
          <ProductRail
            collection={collection}
            region={region}
            pricedProducts={products}
          />
        </Suspense>
      ))}
    </>
  )
}