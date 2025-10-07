'use client'
import { Button, Heading } from "@medusajs/ui"
import Link from "next/link"

const Hero = () => {
  return (
    // Main container: min-h-screen makes it take full viewport height.
    // pt-20 accounts for your 20-unit (e.g., 5rem) tall navigation bar.
    <div className="relative h-[70vh] w-full bg-gray-900 pt-20">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/HeroBackdrop.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white p-8 animate-fade-in">
        
        {/* Main Heading */}
        <Heading
          level="h1"
          className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          Snow Bite Candy Store
        </Heading>

        {/* Subheading */}
        <p 
          className="font-sans mt-4 max-w-2xl text-lg md:text-xl text-gray-200 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          Discover your favorite candies transformed into new, crunchy, and intensely flavorful treats!
        </p>
        
        {/* Call to Action Buttons */}
        <div 
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 animate-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <Link href="/store" passHref>
            <Button
              className="w-full sm:w-auto text-lg px-8 py-3 rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-black"
            >
              Shop All Candy
            </Button>
          </Link>
          <Link href="/collections/featured" passHref>
             <Button
              variant="secondary"
              className="w-full sm:w-auto text-lg px-8 py-3 rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-black"
            >
              See Best Sellers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero