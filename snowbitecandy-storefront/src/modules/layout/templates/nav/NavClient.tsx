'use client'

import { useEffect, useState } from 'react'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

export default function NavClient({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // On mount: load stored state or play intro animation if not set
  useEffect(() => {
    const stored = localStorage.getItem('navIsOpen')

    if (stored === null) {
      // No saved state, play animation
      setTimeout(() => {
        setIsOpen(true)
        setTimeout(() => {
          setIsOpen(false)
          localStorage.setItem('navIsOpen', 'false') // save closed as default after animation
        }, 1000)
      }, 2000)
    } else {
      setIsOpen(stored !== 'false')
    }

    setIsMounted(true)
  }, [])

  // Save state on change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('navIsOpen', isOpen.toString())
    }
  }, [isOpen, isMounted])

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  return (
    <>
      {/* Toggle Button */}
      <div className="absolute top-32 right-4 z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 font-bold text-base sm:text-lg bg-white/10 text-white rounded hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          {isOpen ? (
            <>
              <ChevronUpIcon className="w-5 h-5" />
              Hide Quick Menu
            </>
          ) : (
            <>
              <ChevronDownIcon className="w-5 h-5" />
              Quick Menu
            </>
          )}
        </button>
      </div>

      {/* Animated Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <ul
          className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex lg:flex-row lg:gap-6 rounded-md py-4 px-4"
          data-testid="footer-categories"
        >
          {categories?.slice(0, 6).map((c) => {
            if (c.parent_category) return null

            return (
              <li key={c.id}>
                <LocalizedClientLink
                  href={`/categories/${c.handle}`}
                  data-testid="category-link"
                  className="block text-center text-sm sm:text-base lg:text-lg px-3 py-2 border border-white rounded-md font-semibold bg-white/10 hover:bg-white/40 transition-colors"
                >
                  {c.name}
                </LocalizedClientLink>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
