'use client'

const reviews = [
    {
        name: "Jamie",
        text: "Best candy ever!",
        image: "/reviews/jamie.jpg",
        items: [
            { name: "Freeze Dried Skittles", image: "/candy1.jpg" },
            { name: "Freeze Dried Charleston Chews", image: "/candy2.jpg" }
        ],
        rating: 5
    },
    {
        name: "Alex",
        text: "My kids LOVE these.",
        image: "/reviews/alex.jpg",
        items: [
            { name: "Freeze Dried Peeps", image: "/candy1.jpg" },
            { name: "Freeze Dried Lemonheads", image: "/candy2.jpg" }
        ],
        rating: 4
    },
    {
        name: "Sam",
        text: "Addictively crunchy.",
        image: "/reviews/sam.jpg",
        items: [
            { name: "Candy 1", image: "/candy1.jpg" },
            { name: "Candy 2", image: "/candy2.jpg" }
        ],
        rating: 4
    },
    {
        name: "Taylor",
        text: "Fast shipping & great taste!",
        image: "/reviews/taylor.jpg",
        items: [
            { name: "Candy 1", image: "/candy1.jpg" },
            { name: "Candy 2", image: "/candy2.jpg" }
        ],
        rating: 5
    },
        {
        name: "Taylor",
        text: "Fast shipping & great taste!",
        image: "/reviews/taylor.jpg",
        items: [
            { name: "Candy 1", image: "/candy1.jpg" },
            { name: "Candy 2", image: "/candy2.jpg" }
        ],
        rating: 5
    },
        {
        name: "Taylor",
        text: "Fast shipping & great taste!",
        image: "/reviews/taylor.jpg",
        items: [
            { name: "Candy 1", image: "/candy1.jpg" },
            { name: "Candy 2", image: "/candy2.jpg" }
        ],
        rating: 5
    },
        {
        name: "Taylor",
        text: "Fast shipping & great taste!",
        image: "/reviews/taylor.jpg",
        items: [
            { name: "Candy 1", image: "/candy1.jpg" },
            { name: "Candy 2", image: "/candy2.jpg" }
        ],
        rating: 5
    },
        {
        name: "Taylor",
        text: "Fast shipping & great taste!",
        image: "/reviews/taylor.jpg",
        items: [
            { name: "Candy 1", image: "/candy1.jpg" },
            { name: "Candy 2", image: "/candy2.jpg" }
        ],
        rating: 5
    }
]

const CustomerReviews = () => {
    return (
        <div className="w-full bg-gray-100 py-12 overflow-hidden">
            <h2 className="text-center text-2xl font-semibold mb-8">What Our Customers Say</h2>
            <div className="relative">
                <div className="flex animate-marquee space-x-8 w-max px-4">
                    {[...reviews, ...reviews].map((review, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg p-6 w-64 h-64 flex flex-col justify-between items-center text-center"
                        >
                            <p className="text-gray-700 italic">"{review.text}"</p>

                            <div className="flex flex-col space-y-4 mt-4">
                                {review.items.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <p className="text-sm text-gray-500">{item.name}</p>
                                    </div>
                                ))}
                            </div>

                            <span className="text-sm text-gray-500 mt-4">— {review.name}</span>
                            <span className="text-yellow-500 mt-2">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    )
}

export default CustomerReviews
