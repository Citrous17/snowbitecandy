import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="content-container py-6">
      <div className="flex flex-col lg:flex-row gap-8" data-testid="category-container">
        {/* Sidebar Filters */}

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          {/* Breadcrumbs */}
          <div className="mb-4 flex flex-wrap items-center text-sm text-ui-fg-subtle gap-2">
            <span className="font-semibold text-ui-fg-base text-4xl">{category.name}</span>
            <span className="font-semibold text-ui-fg-base text-xl">{category.description}</span>
          </div>

          {/* Subcategories */}
          {category.category_children?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">Subcategories</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.category_children.map((c) => (
                  <li key={c.id}>
                    <InteractiveLink href={`/categories/${c.handle}`}>
                      {c.name}
                    </InteractiveLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Product Grid */}
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
