// import React, { useState } from "react";
// import type { Artwork } from "@/types/artworks";
// import { ARTWORKS } from "@/data/artworks";

// const TABS = [
//   "All",
//   "Painting",
//   "Sculpture",
//   "Photography",
//   "Acrylic",
//   "Oil Painting",
// ];

// const ITEMS_PER_PAGE = 8;

// const GalleryContent: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filtered = ARTWORKS.filter(
//     (a) => activeTab === "All" || a.tag === activeTab
//   );

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated = filtered.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <section className="bg-gray-50 min-h-screen pb-16">
//       {/* 🔹 العنوان الرئيسي */}
//       <div className="text-center pt-16">
//         <h1 className="text-4xl font-bold text-gray-900">
//           Artist <span className="text-sky-500">Gallery</span>
//         </h1>
//         <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
//           Discover extraordinary paintings from talented artists around the world
//         </p>
//       </div>

//       {/* 🔹 الفلاتر */}
//       <div className="flex flex-wrap justify-center gap-3 mt-8">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab);
//               setCurrentPage(1);
//             }}
//             className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
//               activeTab === tab
//                 ? "bg-sky-500 text-white border-sky-500"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-sky-50"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* 🔹 شبكة الصور فقط */}
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 mt-12">
//         {paginated.map((item: Artwork) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group relative"
//           >
//             <div className="relative">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//               {/* 🔹 التاغ (Physical / Digital) */}
//               <span
//                 className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${
//                   item.type.toLowerCase() === "digital"
//                     ? "bg-pink-500"
//                     : "bg-blue-500"
//                 }`}
//               >
//                 {item.type}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔹 التصفح (Pagination) */}
//       <div className="flex justify-center items-center gap-2 mt-10">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className="px-3 py-2 text-sm text-gray-600 disabled:opacity-40 hover:text-sky-600"
//         >
//           ‹ Previous
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`h-8 w-8 text-sm rounded-md ${
//               currentPage === i + 1
//                 ? "bg-sky-500 text-white"
//                 : "text-gray-700 hover:bg-sky-50"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className="px-3 py-2 text-sm text-gray-600 disabled:opacity-40 hover:text-sky-600"
//         >
//           Next ›
//         </button>
//       </div>
//     </section>
//   );
// };

// export default GalleryContent;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Artwork } from "@/types/artworks";
import { ARTWORKS } from "@/data/artworks";

const TABS = [
  "All",
  "Painting",
  "Sculpture",
  "Photography",
  "Acrylic",
  "Oil Painting",
];

const ITEMS_PER_PAGE = 8;

const GalleryContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // ✅ التنقل

  const filtered = ARTWORKS.filter(
    (a) => activeTab === "All" || a.tag === activeTab
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="bg-gray-50 min-h-screen pb-16">
      {/* 🔹 العنوان الرئيسي */}
      <div className="text-center pt-16">
        <h1 className="text-4xl font-bold text-gray-900">
          Artist <span className="text-sky-500">Gallery</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Discover extraordinary paintings from talented artists around the world
        </p>
      </div>

      {/* 🔹 الفلاتر */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              activeTab === tab
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-sky-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 شبكة الصور فقط */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 mt-12">
        {paginated.map((item: Artwork) => (
          <div
            key={item.id}
            onClick={() => navigate(`/artworks/${item.id}`)} // ✅ التنقل عند الضغط
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group relative"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* 🔹 التاغ (Physical / Digital) */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${
                  item.type.toLowerCase() === "digital"
                    ? "bg-pink-500"
                    : "bg-blue-500"
                }`}
              >
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 التصفح (Pagination) */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-2 text-sm text-gray-600 disabled:opacity-40 hover:text-sky-600"
        >
          ‹ Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`h-8 w-8 text-sm rounded-md ${
              currentPage === i + 1
                ? "bg-sky-500 text-white"
                : "text-gray-700 hover:bg-sky-50"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-2 text-sm text-gray-600 disabled:opacity-40 hover:text-sky-600"
        >
          Next ›
        </button>
      </div>
    </section>
  );
};

export default GalleryContent;
