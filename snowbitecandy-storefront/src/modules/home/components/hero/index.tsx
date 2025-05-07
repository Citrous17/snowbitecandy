'use client'
import { Button, Heading } from "@medusajs/ui"
import { useRouter } from "next/navigation"

const Hero = () => {
  const router = useRouter()

  const storeLink = `${process.env.NEXT_PUBLIC_BASE_URL}/categories/candy`
  return (
    <div className="h-[92vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <img
        src="/HeroBackdrop.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Heading
            level="h1"
            className="text-3xl leading-10 text-white text-ui-fg-base font-normal"
          >
            Snow Bite Candy Store
          </Heading>
        </div>
        </span>
        <a
          href={`${storeLink}`}
          target="_blank"
        >
          <Button variant="secondary">
            Order Now
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero
