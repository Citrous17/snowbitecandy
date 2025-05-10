import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { clx } from "@medusajs/ui"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto duration-200 bg-burgundy-90 border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="h-full flex items-center min-w-fit">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="hidden small:flex absolute left-1/2 transform -translate-x-1/2 pt-10">
            <div className="flex flex-row gap-x-4 items-center text-white pl-8">
              <ul className="flex flex-row gap-x-4 text-white" data-testid="footer-categories">
                {productCategories?.slice(0, 6).map((c) => {
                  if (c.parent_category) return null

                  return (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base text-white txt-large font-bold whitespace-nowrap"
                        href={`/categories/${c.handle}`}
                        data-testid="category-link"
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 text-white mb-8">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-fredoka hover:text-ui-fg-base uppercase "
              data-testid="nav-store-link"
            >
              Snow Bite Candy Store
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full text-white">
              <LocalizedClientLink
                className="hover:text-ui-fg-base font-fredoka text-lg font-bold"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2 text-white font-fredoka text-lg font-bold"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
