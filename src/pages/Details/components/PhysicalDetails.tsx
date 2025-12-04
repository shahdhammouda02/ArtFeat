import React, { useState, useEffect } from "react";
import {
  Heart,
  Truck,
  ChevronDown,
  Package,
  Ruler,
  Scale,
  CheckCircle2,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import type { Artwork } from "@/types/artworks";
import { Auth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type PhysicalDetailsProps = {
  artwork: Artwork;
};

const PhysicalDetails: React.FC<PhysicalDetailsProps> = ({ artwork }) => {
  const [liked, setLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = Auth();
  const { addItem, isInCart } = useCart();

  const allImages = [artwork.image, ...(artwork.images ?? [])];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  useEffect(() => {
    setSelectedImage(artwork.image);
  }, [artwork]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/artworks/${artwork.id}` } });
      return;
    }

    if (isInCart(artwork.id)) {
      navigate("/cart");
      return;
    }

    addItem({
      id: artwork.id,
      title: artwork.title,
      price: artwork.price,
      image: artwork.image,
      type: artwork.type,
    });
  };

  const isItemInCart = isInCart(artwork.id);

  return (
    <main className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <section className="grid grid-cols-1 lg:grid-cols-[480px,1fr] gap-12 items-start">
          {/* 🔹 الصور */}
          <div className="flex gap-4">
            {/* ✅ الصور المصغّرة (من artwork.images فقط) */}
            <div className="flex flex-col gap-3">
              {artwork.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-md overflow-hidden border transition ${
                    selectedImage === img
                      ? "border-sky-500"
                      : "border-gray-200 hover:border-sky-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 rounded-xl overflow-hidden border border-gray-200">
              <img
                src={selectedImage}
                alt={artwork.title}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-4xl font-semibold select-none">
                Art Feat
              </div>

              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-3 right-3 bg-transparent text-white hover:scale-110 transition-all duration-300"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

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

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {artwork.title}
            </h1>
            <p className="text-gray-600 mb-4">
              By{" "}
              <span className="text-sky-600 font-medium">{artwork.author}</span>
            </p>

            <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
              {"★".repeat(5)}
              <span className="text-gray-500 ml-2 text-xs">(103 reviews)</span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${artwork.price}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                {artwork.type}
              </span>
              <span className="inline-block bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full">
                {artwork.tag}
              </span>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className={`w-1/4 flex justify-center items-center gap-2 border ${
                  isItemInCart
                    ? "border-green-500 text-green-600 hover:bg-green-50"
                    : "border-sky-500 text-sky-600 hover:bg-sky-50"
                } transition rounded-md py-2.5 font-medium text-sm`}
              >
                {isItemInCart ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    View in Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            <details open className="pt-5">
              <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
                Item Details
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </summary>

              <div className="mt-3 space-y-4 text-sm text-gray-700 leading-relaxed">
                <h4 className="font-semibold text-sky-600 text-sm">
                  Highlights
                </h4>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <User className="w-4 h-4 text-black mt-[2px]" />
                    <span>
                      Designed by{" "}
                      <span className="font-medium text-sky-600">
                        {artwork.author}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-black mt-[2px]" />
                    <span>
                      Materials: wool felt, needle felted, jute thread
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <Ruler className="w-4 h-4 text-black mt-[2px]" />
                    <div>
                      <p className="font-medium text-gray-900">Size:</p>
                      <div className="grid grid-cols-2 gap-x-4 text-xs text-gray-600 pl-6">
                        <span>
                          Width: {artwork.size?.width?.value}{" "}
                          {artwork.size?.width?.unit}
                        </span>
                        <span>
                          Height: {artwork.size?.height?.value}{" "}
                          {artwork.size?.height?.unit}
                        </span>
                        <span>
                          Depth: {artwork.size?.depth?.value}{" "}
                          {artwork.size?.depth?.unit}
                        </span>
                        <span>
                          Length: {artwork.size?.length?.value}{" "}
                          {artwork.size?.length?.unit}
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-2">
                    <Scale className="w-4 h-4 text-black mt-[2px]" />
                    <span>Weight: 3.2 kg</span>
                  </li>
                </ul>
              </div>
            </details>

            <details open className="pt-5 mt-4">
              <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
                Shipping
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </summary>

              <div className="mt-3 text-sm text-gray-700 space-y-4 pl-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Shipping Options to Palestine Available</span>
                  </div>
                  <button className="text-xs text-sky-600 hover:underline">
                    change
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-black" />
                  <span>Returns & exchanges not accepted</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-black" />
                    <select className="border border-gray-300 rounded-md p-2 text-gray-700 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                      <option>choose shipping company</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 pl-6 cursor-pointer">
                    <input
                      type="radio"
                      name="ship"
                      defaultChecked
                      className="accent-sky-500"
                    />
                    <span>Post Logistics – $15 (5–7 days)</span>
                  </label>

                  <label className="flex items-center gap-2 pl-6 cursor-pointer">
                    <input
                      type="radio"
                      name="ship"
                      className="accent-sky-500"
                    />
                    <span>DHL Express – $25 (2–3 days)</span>
                  </label>
                </div>

                <div className="flex items-center gap-2 pl-6">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Guaranteed delivery</span>
                </div>
              </div>
            </details>
          </div>
        </section>
      </div>

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

export default PhysicalDetails;
