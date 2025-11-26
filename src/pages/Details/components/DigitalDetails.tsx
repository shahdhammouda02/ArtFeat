import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  ChevronDown,
  User,
  FileText,
  Ruler,
  Image as ImageIcon,
  Heart,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Artwork } from "@/types/artworks";
import { ARTWORKS } from "@/data/artworks";

const DigitalDetails: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const [liked, setLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();

  const allImages = [artwork.image, ...(artwork.images ?? [])];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  // ✅ عند تغيير العمل يتم تحديث الصورة الأساسية
  useEffect(() => {
    setSelectedImage(artwork.image);
  }, [artwork]);

  const suggested = ARTWORKS.filter(
    (item) => item.type === artwork.type && item.id !== artwork.id
  );

  return (
    <main className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================== القسم الرئيسي ================== */}
        <section className="grid grid-cols-1 lg:grid-cols-[480px,1fr] gap-12 items-start">
          {/* 🔹 الصور */}
          <div className="flex gap-4">
            {/* ✅ الصور المصغّرة (فقط الفرعيات) */}
            <div className="flex flex-col gap-3">
              {artwork.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 border rounded-md overflow-hidden transition-colors ${
                    selectedImage === img
                      ? "border-sky-500"
                      : "border-gray-200 hover:border-sky-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${artwork.title}-thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* ✅ الصورة الكبيرة */}
            <div className="flex-1 relative">
              <img
                src={selectedImage}
                alt={artwork.title}
                className="w-full h-[480px] object-cover rounded-xl border border-gray-200"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/80 text-5xl font-semibold select-none">
                Art Feat
              </div>

              {/* ❤️ أيقونة القلب */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-3 right-3 bg-transparent hover:scale-110 transition-all duration-300"
                title="Add to favorites"
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    liked
                      ? "fill-red-500 stroke-red-500 scale-110"
                      : "stroke-white"
                  }`}
                  strokeWidth={2}
                />
              </button>

              {/* ◀️ السهم السابق */}
              <button
                onClick={() => {
                  const currentIndex = allImages.indexOf(selectedImage);
                  const prevIndex =
                    (currentIndex - 1 + allImages.length) % allImages.length;
                  setSelectedImage(allImages[prevIndex]);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent border border-white text-white p-2 rounded-full shadow transition hover:bg-white/10"
                title="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* ▶️ السهم التالي */}
              <button
                onClick={() => {
                  const currentIndex = allImages.indexOf(selectedImage);
                  const nextIndex = (currentIndex + 1) % allImages.length;
                  setSelectedImage(allImages[nextIndex]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border border-white text-white p-2 rounded-full shadow transition hover:bg-white/10"
                title="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 🔍 أيقونة التكبير */}
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-3 right-3 bg-transparent border border-white text-white p-2 rounded-full shadow transition hover:bg-white/10"
                title="Zoom image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 🔹 تفاصيل النص */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{artwork.title}</h1>
            <p className="text-gray-600 mb-4">By {artwork.author}</p>

            <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
              {"★".repeat(5)}
              <span className="text-gray-500 ml-2 text-xs">(103 reviews)</span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-2">${artwork.price}</div>

            <div className="flex items-center gap-2 mt-3">
              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                {artwork.type}
              </span>
              <span className="inline-block bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full">
                {artwork.tag}
              </span>
            </div>

            <div className="mt-6">
              <button className="w-1/4 flex justify-center items-center gap-2 border border-sky-500 text-sky-600 hover:bg-sky-50 transition rounded-md py-2.5 font-medium text-sm">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

            {/* التفاصيل */}
            <div className="mt-6 border-0 pt-2">
              <details open className="space-y-4">
                <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
                  Item Details
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </summary>

                <div className="mt-3 space-y-4 text-sm text-gray-700 leading-relaxed">
                  <h4 className="font-semibold text-sky-600 text-sm">Highlights</h4>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-800 mt-[2px]" />
                      <span>
                        Designed by{" "}
                        <span className="font-medium text-sky-600">{artwork.author}</span>
                      </span>
                    </li>

                    <li className="flex items-start gap-2">
                      <ImageIcon className="w-4 h-4 text-gray-800 mt-[2px]" />
                      <span>Digital download</span>
                    </li>

                    <li className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-gray-800 mt-[2px]" />
                      <span>Digital file types: 1 PDF</span>
                    </li>
                  </ul>

                  <p className="text-gray-600 text-sm pl-6">
                    All of our artworks are original and designed by hand.
                  </p>

                  {/* الحجم */}
                  <div className="flex items-start gap-2">
                    <Ruler className="w-4 h-4 text-gray-800 mt-[2px]" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Size:</p>
                      <p className="text-gray-600 text-sm">
                        {artwork.size?.width?.value} {artwork.size?.width?.unit} ×{" "}
                        {artwork.size?.height?.value} {artwork.size?.height?.unit}
                        {artwork.dpi && (
                          <>
                            <br />
                            {artwork.dpi} dpi
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sky-600 font-semibold text-sm">Instant Download</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Your files will be available to download once payment is confirmed.
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ================== قسم المقترحات ================== */}
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.slice(0, 3).map((item) => (
              <article
                key={item.id}
                onClick={() => navigate(`/artworks/${item.id}`)}
                className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white/70 text-3xl font-semibold select-none">
                    Art Feat
                  </div>
                  <span className="absolute top-2 left-2 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-gray-500 text-sm">by {item.author}</p>
                  <p className="text-gray-900 font-semibold text-base truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-gray-900 font-bold text-sm">${item.price}</p>
                      <div className="flex items-center text-amber-400 text-xs">
                        {"★".repeat(5)}
                        <span className="text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full hover:bg-sky-100 text-sky-500 transition"
                      title="Add to cart"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ✅ نافذة التكبير */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 cursor-zoom-out"
        >
          <div className="relative max-w-5xl w-full px-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="absolute top-6 right-8 text-white hover:text-gray-300 transition p-1.5 rounded-full hover:bg-white/10 z-50"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              <img
                src={selectedImage}
                alt={artwork.title}
                className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg select-none"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-5xl font-semibold select-none pointer-events-none">
                Art Feat
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default DigitalDetails;
