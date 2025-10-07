  import { Metadata } from "next"

  import FeaturedProducts from "@modules/home/components/featured-products"
  import Hero from "@modules/home/components/hero"
  import { listCollections } from "@lib/data/collections"
  import { getRegion } from "@lib/data/regions"
  import OurStory from "@modules/home/components/our-story"
  import WhyFreezeDried from "@modules/home/components/why-freeze-dried"
  import CustomerReviews from "@modules/home/components/customer-reviews"
import CustomFreezeDrySlider from "@modules/home/components/custom-order/page"

  export const metadata: Metadata = {
    title: "Snow Bite Candy Store",
    description:
      "A candy store that offers a wide variety of delicious and unique freeze dried candies from around the world.",
  }

  export default async function Home(props: {
    params: Promise<{ countryCode: string }>
  }) {
    const params = await props.params

    const { countryCode } = params

    const region = await getRegion(countryCode)

    const { collections } = await listCollections({
      fields: "id, handle, title",
    })

    if (!collections || !region) {
      return null
    }

    return (
      <>
        <Hero />
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
        <WhyFreezeDried />
      </>
    )
  }
