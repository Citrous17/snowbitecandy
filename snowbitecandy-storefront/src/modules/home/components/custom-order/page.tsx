'use client'

import { useRef, useState } from "react"

const FreezeDriedBuilder = () => {
    const [weight, setWeight] = useState(1)
    const [fruit, setFruit] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [foodName, setFoodName] = useState("")
    const [email, setEmail] = useState("")

    // ⬇️ This ref targets just the FORM box
    const formContainerRef = useRef<HTMLDivElement | null>(null)

    const getBasePrice = (weight: number) => {
        switch (weight) {
            case 1: return 15
            case 2: return 30
            case 3: return 40
            case 4: return 50
            case 5: return "Contact Sales"
            default: return 0
        }
    }

    const calculatePrice = () => {
        const base = getBasePrice(weight)
        if (typeof base === "string") return base
        let total = base
        if (fruit) total += 5
        if (tempControl) total += 10
        return `$${total}`
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const total = calculatePrice()
        console.log("Submitting order:", { foodName, weight, fruit, tempControl, total })
    }

    // ⬇️ Scroll to the form specifically
    const scrollToForm = () => {
        formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <div className="w-full bg-cream-10 px-4 py-16 mt-14 lg:mt-44" ref={formContainerRef}>
            {/* Header */}
            <div
                className="cursor-pointer flex items-center justify-center"
                onClick={scrollToForm}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="text-xl lg:text-4xl font-bold text-black text-center pb-4 lg:my-8">
                    Order Your Own Custom Freeze-Dried Food!
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Layout */}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
                {/* Form Section */}

                <form
                    onSubmit={handleSubmit}
                    className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
                >
                    <h1 className="text-lg lg:text-4xl font-bold">
                        Custom Order Form
                    </h1>
                    <div className="block sm:hidden w-full lg:w-1/3 text-gray-700 text-base leading-relaxed lg:pt-48">
                        <p className="mb-4">
                            Customize your perfect freeze-dried meal! Choose your desired weight, add specialty options like fruit or temperature-sensitive ingredients, and tell us what you’d like preserved.
                        </p>
                        <p className="mb-4">
                            Whether you’re prepping for adventure, stocking up for emergencies, or just love crunchy, preserved food — we’ve got you covered.
                        </p>
                        <p>
                            Orders over 5lb require special handling. Reach out for volume discounts or personalized service.
                        </p>
                    </div>
                    {/* Weight Selection */}
                    <div>
                        <label className="block text-lg font-semibold ">Select Weight:</label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full accent-pink-500"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>1lb</span>
                            <span>2lb</span>
                            <span>3lb</span>
                            <span>4lb</span>
                            <span>5lb+</span>
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={fruit}
                                onChange={() => setFruit(!fruit)}
                                className="accent-pink-500"
                            />
                            <span>+$5 for fruit</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={tempControl}
                                onChange={() => setTempControl(!tempControl)}
                                className="accent-pink-500"
                            />
                            <span>+$10 for temperature controlled items</span>
                        </label>
                    </div>

                    {/* Food Name */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Enter Food Name:</label>
                        <input
                            type="text"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            placeholder="e.g., Strawberries, Chicken, Fruit Snacks"
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-pink-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Your Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-pink-300"
                        />
                    </div>

                    {/* Price + Submit */}
                    <div className="text-xl font-bold">
                        Estimated Price: {calculatePrice()}
                    </div>

                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg font-semibold transition"
                    >
                        Submit Request
                    </button>

                    <p className="text-xs text-gray-500">
                        * Prices may vary based on availability. Final quote will be confirmed before processing.
                    </p>
                </form>

                {/* Description Section */}
                <div className="hidden sm:block w-full lg:w-1/3 text-gray-700 text-base leading-relaxed lg:pt-48">
                    <p className="mb-4">
                        Customize your perfect freeze-dried meal! Choose your desired weight, add specialty options like fruit or temperature-sensitive ingredients, and tell us what you’d like preserved.
                    </p>
                    <p className="mb-4">
                        Whether you’re prepping for adventure, stocking up for emergencies, or just love crunchy, preserved food — we’ve got you covered.
                    </p>
                    <p>
                        Orders over 5lb require special handling. Reach out for volume discounts or personalized service.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FreezeDriedBuilder
