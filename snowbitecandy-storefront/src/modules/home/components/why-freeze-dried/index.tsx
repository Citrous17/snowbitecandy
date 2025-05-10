'use client'
import Lottie from "lottie-react"
import { Heading } from "@medusajs/ui"
import ShelfLifeAnimation from "@lib/animations/LongShelfLifeAnimation.json";
import HeartAnimation from "@lib/animations/HeartAnimation.json";
import ScienceAnimation from "@lib/animations/ScienceAnimation.json";

const WhyFreezeDried = () => {
    return (
        <div className="w-full py-32 px-6 bg-cream-10 text-center">
            <Heading level="h2" className="text-7xl mb-4">
                Why Freeze-Dried?
            </Heading>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
                Freeze drying preserves the flavor and nutrients of your favorite treats while giving them a unique, crunchy texture. It transforms ordinary candy into extraordinary experiences, making every bite a delightful surprise. Enjoy the rich taste of your favorite sweets with a satisfying crunch that you won't find anywhere else!
            </p>

            <div className="flex justify-center gap-12">
                <div className="flex flex-col items-center text-center">
                    <Lottie
                        animationData={ShelfLifeAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-16 h-24 mb-4"
                    />
                    <p className="max-w-sm text-gray-600">
                        Freeze Dried Candy has a best taste shelf life of 2 years, and is safe to eat for up to 25 years!
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <Lottie
                        animationData={HeartAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-24 h-24 mb-4"
                    />
                    <p className="max-w-sm text-gray-600">
                        Our Freeze Dried Candy retains its nurtitional content, and no additional preservatives are added.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <Lottie
                        animationData={ScienceAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-24 h-24 mb-4"
                    />
                    <p className="max-w-sm text-gray-600">
                        Freeze Dried candy is made using a scientific process that removes moisture from the candy in a high-tech vacuum chamber, creating a crunchy texture and intense flavor.
                    </p>
                </div>
            </div>


        </div>
    )
}

export default WhyFreezeDried
