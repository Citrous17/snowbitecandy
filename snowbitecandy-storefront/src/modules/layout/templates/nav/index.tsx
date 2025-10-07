import { Suspense } from "react"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Link from 'next/link'

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
)

export default async function Nav() {
  const { collections } = await listCollections()
  const regions = await listRegions()

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 border-b duration-200 bg-burgundy-90">
        <nav className="content-container mx-auto flex items-center justify-between w-full h-full text-white px-4 sm:px-6">
          {/* ========== MOBILE VIEW (< lg) ========== */}
          <div className="flex lg:hidden items-center justify-between w-full h-full">
            {/* Left Item: Hamburger Menu */}
            <div className="flex-1 basis-0">
              <SideMenu regions={regions} />
            </div>

            {/* Center Item: Logo */}
            <div className="text-center">
              <LocalizedClientLink
                href="/"
                className="hover:text-gray-400 duration-200 uppercase font-fredoka font-bold text-xl whitespace-nowrap"
              >
                Snow Bite Candy
              </LocalizedClientLink>
            </div>

            {/* Right Item: Icons */}
            <div className="flex-1 basis-0 flex items-center justify-end gap-x-2 sm:gap-x-4">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-gray-400 flex items-center text-sm sm:text-base whitespace-nowrap"
                    href="/cart"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>

          {/* ========== DESKTOP VIEW (>= lg) ========== */}
          <div className="hidden lg:flex items-center justify-between w-full h-full">
            {/* Left Item: Logo */}
            <div>
              <LocalizedClientLink
                href="/"
                className="hover:text-gray-400 duration-200 uppercase font-fredoka font-bold text-2xl whitespace-nowrap"
              >
                Snow Bite Candy
              </LocalizedClientLink>
            </div>

            {/* Center Item: Navigation Links */}
            <div>
              <ul className="flex items-center gap-x-8 h-full">
                <li>
                  <LocalizedClientLink
                    className="text-lg font-semibold hover:text-gray-400 duration-200"
                    href="/store"
                  >
                    Shop All
                  </LocalizedClientLink>
                </li>
                {collections.slice(0, 3).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      className="text-lg font-semibold hover:text-gray-400 duration-200"
                      href={`/collections/${collection.handle}`}
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
                <li>
                  <Link
                    className="text-lg font-semibold hover:text-gray-400 duration-200"
                    href="mailto:contact@snowbitecandy.com?subject=General%20Inquiry&body=Hello%20Snow%20Bite%20Candy%20team%2C%0A%0AI%20would%20like%20to%20inquire%20about..."
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Item: Icons */}
            <div className="flex items-center gap-x-4">
              <LocalizedClientLink className="hover:text-gray-400" href="/account">
                <UserIcon />
              </LocalizedClientLink>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-gray-400 flex items-center text-base whitespace-nowrap"
                    href="/cart"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}