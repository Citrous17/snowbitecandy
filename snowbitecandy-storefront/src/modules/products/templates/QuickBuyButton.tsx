'use client'

import { BoltIcon, ChevronDoubleDownIcon } from '@heroicons/react/24/outline'

const QuickBuyButton = () => {
  const scrollToTarget = () => {
    const el = document.getElementById('product-onboarding')
    if (el) {
      const yOffset = -180 // adjust this to match your fixed header height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToTarget}
      className="flex w-full bg-blue-500 text-white text-2xl lg:text-3xl px-6 py-3 rounded-l-full shadow-md"
    >
      Quick Buy!
      <ChevronDoubleDownIcon className="w-5 h-5 text-black" />
    </button>
  )
}

export default QuickBuyButton
