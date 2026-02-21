// "use client";
// import { useState } from "react";

// export default function StoreFilters() {
//   const [active, setActive] = useState("popularity");

//   const filters = [
//     { label: "Popularity", value: "popularity" },
//     { label: "Rating", value: "rating" },
//     { label: "New Stores", value: "new" },
//     { label: "Most Products", value: "products" },
//     { label: "Stores of My City", value: "city" },
//   ];

//   return (
//     <div className="w-full bg-white py-4">
      
//       {/* Scroll container for mobile */}
//       <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 md:px-10">

//         {filters.map((filter) => (
//           <button
//             key={filter.value}
//             onClick={() => setActive(filter.value)}
//             className={`
//               cursor-pointer
//               whitespace-nowrap
//               px-5 py-2.5
//               rounded-full
//               text-sm sm:text-base
//               font-medium
//               transition-all duration-300
//               border
//               ${
//                 active === filter.value
//                   ? "bg-[#0B1E3F] text-white border-[#0B1E3F] shadow-md scale-105"
//                   : "bg-white text-[#0B1E3F] border-[#0B1E3F]/30 hover:bg-[#0B1E3F]/10"
//               }
//             `}
//           >
//             {filter.label}
//           </button>
//         ))}

//       </div>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function StoreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter") || "popularity";

  const filters = [
    { label: "Popularity", value: "popularity" },
    { label: "Rating", value: "rating" },
    { label: "New Stores", value: "new" },
    { label: "Most Products", value: "products" },
    { label: "Stores of My City", value: "city" },
  ];

  const handleClick = (value) => {
    router.push(`/store/filter?filter=${value}`);
  };

  return (
    <div className="w-full py-4">
      <div className="w-full flex gap-3 overflow-x-auto no-scrollbar px-4">

        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleClick(filter.value)}
            className={`
              cursor-pointer
              whitespace-nowrap
              px-5 py-2.5
              rounded-full
              text-sm sm:text-base
              font-medium
              border
              transition-all duration-300
              ${
                active === filter.value
                  ? "bg-white text-[#0B1E3F] border-[#0B1E3F] shadow-md"
                  : "bg-[#0B1E3F] text-white border-[#0B1E3F] hover:opacity-90"
              }
            `}
          >
            {filter.label}
          </button>
        ))}

      </div>
    </div>
  );
}