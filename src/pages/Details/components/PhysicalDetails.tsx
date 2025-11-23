import React from "react";
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
        {/* ===== القسم الرئيسي ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-[480px,1fr] gap-12 items-start">
          {/* 🔹 الصور */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 hover:border-sky-500 transition"
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
            {/* العنوان */}
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {artwork.title}
            </h1>
            <p className="text-gray-600 mb-4">
              By{" "}
              <span className="text-sky-600 font-medium">{artwork.author}</span>
            </p>

            {/* التقييم */}
            <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
              {"★".repeat(5)}
              <span className="text-gray-500 ml-2 text-xs">(103 reviews)</span>
            </div>

            {/* السعر */}
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${artwork.price}
            </div>

            {/* النوع */}
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                {artwork.type}
              </span>
              <span className="inline-block bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full">
                {artwork.tag}
              </span>
            </div>

            {/* زر Add to Cart */}
            <div className="mt-6">
              <button className="w-1/4 flex justify-center items-center gap-2 border border-sky-500 text-sky-600 hover:bg-sky-50 transition rounded-md py-2.5 font-medium text-sm">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

          {/* تفاصيل العمل */}
<details open className="pt-5">
  <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
    Item Details
    <ChevronDown className="w-4 h-4 text-gray-500" />
  </summary>

  <div className="mt-3 space-y-4 text-sm text-gray-700 leading-relaxed">
    <h4 className="font-semibold text-sky-600 text-sm">Highlights</h4>

    <ul className="space-y-3">
      {/* Designed by */}
      <li className="flex items-start gap-2">
        <User className="w-4 h-4 text-black mt-[2px]" />
        <span>
          Designed by{" "}
          <span className="font-medium text-sky-600">
            {artwork.author}
          </span>
        </span>
      </li>

      {/* Materials */}
      <li className="flex items-start gap-2">
        <Package className="w-4 h-4 text-black mt-[2px]" />
        <span>Materials: wool felt, needle felted, jute thread</span>
      </li>

      {/* Size */}
      <li className="flex items-start gap-2">
        <Ruler className="w-4 h-4 text-black mt-[2px]" />
        <div>
          <p className="font-medium text-gray-900">Size:</p>
          <div className="grid grid-cols-2 gap-x-4 text-xs text-gray-600 pl-6">
            <span>Width: 3 inches</span>
            <span>Height: 6 inches</span>
            <span>Depth: 1 inch</span>
            <span>Length: 15cm</span>
          </div>
        </div>
      </li>

      {/* Weight */}
      <li className="flex items-start gap-2">
        <Scale className="w-4 h-4 text-black mt-[2px]" />
        <span>Weight: 3.2 kg</span>
      </li>
    </ul>

    {/* الفقرات السفلية */}
<div className="space-y-2">
  <p className="text-gray-600 text-sm leading-relaxed">
    All of our artworks are original, and designed by hand at studio
    diudende. Wake up your walls with artwork from diudende studio!
  </p>

  <p className="text-gray-600 text-sm leading-relaxed">
    Hand-drawn, sketch style, physical wall art. Hang this
    minimalistic, warm neutral autumn artwork in your kitchen.
  </p>
</div>

  </div>
</details>


        {/* قسم الشحن */}
<details open className="pt-5 mt-4">
  <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
    Shipping
    <ChevronDown className="w-4 h-4 text-gray-500" />
  </summary>

  <div className="mt-3 text-sm text-gray-700 space-y-4 pl-2">
    {/* 🔹 سطر: Shipping Options */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
<CheckCircle2 className="w-4 h-4 text-black" />
        <span>Shipping Options to Palestine Available</span>
      </div>
      <button className="text-xs text-sky-600 hover:underline">
        change
      </button>
    </div>

    {/* 🔹 سطر: Returns */}
    <div className="flex items-center gap-2">
      <Package className="w-4 h-4 text-black" />
      <span>Returns & exchanges not accepted</span>
    </div>

    {/* 🔹 سطر: اختيار شركة الشحن */}
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-black" />
        <select className="border border-gray-300 rounded-md p-2 text-gray-700 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
          <option>choose shipping company</option>
        </select>
      </div>

      {/* 🔸 خيارات الشحن */}
      <label className="flex items-center gap-2 pl-6 cursor-pointer">
        <input type="radio" name="ship" defaultChecked className="accent-sky-500" />
        <span>Post Logistics – $15 (5–7 days)</span>
      </label>
      <label className="flex items-center gap-2 pl-6 cursor-pointer">
        <input type="radio" name="ship" className="accent-sky-500" />
        <span>DHL Express – $25 (2–3 days)</span>
      </label>
    </div>

    {/* 🔹 سطر: Guaranteed Delivery */}
    <div className="flex items-center gap-2 pl-6">
      <CheckCircle2 className="w-4 h-4 text-black" />
      <span>Guaranteed delivery</span>
    </div>
  </div>
</details>

          </div>
        </section>
      </div>
    </main>
  );
};

export default PhysicalDetails;
