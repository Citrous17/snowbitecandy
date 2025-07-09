'use client'
import { Button, Heading } from "@medusajs/ui"
import { useRouter } from "next/navigation"


const Hero = () => {
 const router = useRouter()


 const storeLink = `${process.env.NEXT_PUBLIC_BASE_URL}/categories/candy`
 return (
   <div className="h-[36vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
     <img
       src="/HeroBackdrop.png"
       alt="Background"
       className="relative h-[60vh] inset-0 w-full object-cover opacity-90 bg-black"
     />
     <div className="absolute inset-0 z-10 flex flex-col h-[60vh] justify-center items-center text-center gap-6 bg-black bg-opacity-50 ">
       <span>
       <div className="p-8 ">
         <Heading
           level="h1"
           className="text-6xl md:text-6xl lg:text-8xl text-white pb-6 md:pb-8 lg:pb-10"
         >
         Snow Bite Candy Store
         </Heading>
         <Heading
           level="h1"
           className="text-4xl leading-10 text-white"
         >
         The best shop for all your favorite freeze-dried delights!
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