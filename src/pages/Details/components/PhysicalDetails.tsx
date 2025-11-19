import React from "react";
import {
  Heart,
  Truck,
  ChevronDown,
  Package,
  Ruler,
  Scale,
  CheckCircle2,
} from "lucide-react";
import type { Artwork } from "@/types/artworks";

type PhysicalDetailsProps = {
  artwork: Artwork;
};

const PhysicalDetails: React.FC<PhysicalDetailsProps> = ({ artwork }) => {
  const thumbnails = [artwork.image, artwork.image, artwork.image];

  return (
    <main className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* ========== القسم الرئيسي ========== */}
        <section className="grid grid-cols-1 lg:grid-cols-[480px,1fr] gap-12 items-start">
          {/* 🔹 الصور */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-sky-500 transition"
                >
                  <img
                    src={img}
                    alt={`thumbnail-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden border border-gray-200">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-4xl font-semibold select-none">
                Art Feat
              </div>

              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white shadow">
                <Heart className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* 🔹 التفاصيل النصية */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {artwork.title}
            </h1>
            <p className="text-gray-600 mb-4">
              By <span className="text-sky-600 font-medium">{artwork.author}</span>
            </p>

            <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
              {"★".repeat(5)}
              <span className="text-gray-500 ml-2 text-xs">(103 reviews)</span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${artwork.price}
            </div>

            {/* الوسوم */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                physical
              </span>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                paintings
              </span>
            </div>

            {/* زر Add to Cart */}
            <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-md text-sm font-medium transition mb-6">
              Add to Cart
            </button>

            {/* تفاصيل العمل */}
            <details open className="space-y-3 border-t pt-5">
              <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
                Item Details
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </summary>

              <div className="mt-3 space-y-4 text-sm text-gray-700">
                <h4 className="font-semibold text-gray-900">Highlights</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 mt-[2px]" />
                    Designed by <span className="font-medium">{artwork.author}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-sky-500 mt-[2px]" />
                    Materials: wool felt, needle felted, jute thread
                  </li>
                  <li className="flex items-start gap-2">
                    <Ruler className="w-4 h-4 text-sky-500 mt-[2px]" />
                    Size: width 3 inches × height 6 inches × length 15cm
                  </li>
                  <li className="flex items-start gap-2">
                    <Scale className="w-4 h-4 text-sky-500 mt-[2px]" />
                    Weight: 3.2 kg
                  </li>
                </ul>

                <p className="text-gray-600 text-sm leading-relaxed">
                  All of our artwork are original and designed by hand at studio
                  diudende. Wake up your walls with artwork from diudende studio!
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Hand-drawn, sketch style, physical wall art. Hang this
                  minimalistic, warm neutral autumn artwork in your kitchen.
                </p>
              </div>
            </details>

            {/* قسم الشحن */}
            <details open className="space-y-3 border-t pt-5 mt-6">
              <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
                Shipping
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </summary>

              <div className="mt-3 text-sm text-gray-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-sky-500" />
                    <span>Shipping options to Palestine available</span>
                  </div>
                  <button className="text-xs text-sky-600 hover:underline">
                    change
                  </button>
                </div>

                <p className="text-gray-600 text-sm">
                  Returns & exchanges not accepted
                </p>

                {/* خيارات الشحن */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">
                    Choose shipping company
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded-md p-3 hover:border-sky-500">
                    <input type="radio" name="ship" defaultChecked />
                    <span>Post Logistics – $15 (5–7 days)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded-md p-3 hover:border-sky-500">
                    <input type="radio" name="ship" />
                    <span>DHL Express – $25 (2–3 days)</span>
                  </label>
                </div>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Guaranteed delivery
                </p>
              </div>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PhysicalDetails;
