import { Suspense } from "react"
import NavClient from './NavClient'

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
    <div className="sticky top-0 inset-x-0 z-50 bg-burgundy-90 text-white">
      <header className="border-b border-ui-border-base">
        <nav className="content-container flex flex-col items-center py-8 px-4 lg:px-8">

          {/* Title */}
          <LocalizedClientLink
            href="/"
            className="text-center text-2xl sm:text-3xl lg:text-5xl font-fredoka font-bold uppercase hover:text-ui-fg-base"
            data-testid="nav-store-link"
          >
            Snow Bite Candy Store
          </LocalizedClientLink>

          {/* Top Nav Row */}
          <div className="flex items-center justify-between w-full mt-4">
            {/* Left: Side Menu */}

            <div className="flex items-center gap-2">
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-base font-fredoka text-2xl font-semibold"
                data-testid="nav-home-link"
              >
                Home
              </LocalizedClientLink>
            </div>

            {/* Right: Account + Cart */}
            <div className="flex items-center gap-2">
              <LocalizedClientLink
                className="hover:text-ui-fg-base font-fredoka  text-2xl  font-semibold"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-2">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base font-fredoka  text-2xl  font-semibold"
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
          </div>

          {/* Dropdown section (Button + Menu) */}
          <div className="mt-4 w-full">
            <NavClient categories={productCategories} />
          </div>
        </nav>
      </header>
    </div>
  )
}
