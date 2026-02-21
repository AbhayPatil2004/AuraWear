"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CategoriesSection() {
    const router = useRouter();

    const categories = [
        {
            name: "Grocery ",
            slug: "grocery",
            image: "/glocery.jpg",
            description: "Fresh vegetables, fruits & daily essentials from local vendors.",
        },
        {
            name: "Fashion & Clothing",
            slug: "fashion",
            image: "/fashion.jpg",
            description: "Trendy outfits and traditional wear from nearby stores.",
        },
        {
            name: "Electronics",
            slug: "electronics",
            image: "/electronics.jpg",
            description: "Mobiles, accessories & gadgets at best local prices.",
        },
        {
            name: "Home & Kitchen",
            slug: "home-kitchen",
            image: "/appliance.avif",
            description: "Furniture, decor & kitchen essentials from trusted sellers.",
        },
        {
            name: "Medical & Pharmacy",
            slug: "medical",
            image: "/medical.jpg",
            description: "Medicines and healthcare products from verified pharmacies.",
        },
        {
            name: "Books & Stationery",
            slug: "books",
            image: "/books.jpg",
            description: "Educational books and office supplies from local shops.",
        },
        {
            name: "Sports & Fitness",
            slug: "sports",
            image: "/sports.jpg",
            description: "Gym equipment and sports gear from nearby sellers.",
        },
        {
            name: "Beauty & Personal Care",
            slug: "beauty",
            image: "/beauty.jpg",
            description: "Cosmetics and grooming essentials from trusted brands.",
        },

        {
            name: "Hardware & Tools",
            slug: "hardware",
            image: "/harware.jpg",
            description: "Construction materials, tools and home improvement supplies."
        },
        {
            name: "Bakery & Sweets",
            slug: "bakery",
            image: "/bakery.jpg",
            description: "Fresh cakes, sweets and bakery items from local shops."
        },
        {
            name: "Toys & Kids Store",
            slug: "toys",
            image: "/toys.jpg",
            description: "Toys, baby products and kids essentials."
        },
    ];

    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % categories.length);
    };

    const handlePrev = () => {
        setIndex((prev) =>
            prev === 0 ? categories.length - 1 : prev - 1
        );
    };

    const handleClick = () => {
        router.push(`/store/category?cat=${categories[index].slug}`);
    };

    const category = categories[index];

    return (
        <section className="w-full bg-gray-50">

            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">

                {/* Banner */}
                <div
                    onClick={handleClick}
                    className="relative w-full h-full overflow-hidden cursor-pointer group"
                >
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 md:px-20 text-white">
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4">
                            {category.name}
                        </h2>
                        <p className="text-sm sm:text-lg md:text-xl max-w-2xl">
                            {category.description}
                        </p>
                    </div>
                </div>

                {/* Left Button */}
                <button
                    onClick={handlePrev}
                    className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-4 
                     bg-white/90 backdrop-blur-md shadow-lg 
                     p-3 rounded-full hover:scale-110 transition"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Right Button */}
                <button
                    onClick={handleNext}
                    className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 
                     bg-white/90 backdrop-blur-md shadow-lg 
                     p-3 rounded-full hover:scale-110 transition"
                >
                    <ChevronRight size={24} />
                </button>

            </div>
        </section>
    );
}