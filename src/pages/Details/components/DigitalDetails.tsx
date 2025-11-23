import React from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { User, FileText, Ruler, Image as ImageIcon } from "lucide-react";

import type { Artwork } from "@/types/artworks";
import { ARTWORKS } from "@/data/artworks";

type DigitalDetailsProps = {
  artwork: Artwork;
};

const DigitalDetails: React.FC<DigitalDetailsProps> = ({ artwork }) => {
  // اقتراحات أخرى (نفس النوع)
  const suggested = ARTWORKS.filter(
    (item) => item.type === artwork.type && item.id !== artwork.id
  );

  return (
    <main className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================== القسم الرئيسي ================== */}
        <section className="grid grid-cols-1 lg:grid-cols-[480px,1fr] gap-12 items-start">
          {/* 🔹 العمود الأيسر - الصور */}
          <div className="flex gap-4">
            {/* صور مصغرة */}
            <div className="flex flex-col gap-3">
              {[artwork.image, artwork.image, artwork.image].map((img, i) => (
                <button
                  key={i}
                  className="w-16 h-16 border rounded-md overflow-hidden hover:border-sky-500 transition-colors"
                >
                  <img
                    src={img}
                    alt={`${artwork.title}-thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* الصورة الكبيرة */}
            <div className="flex-1 relative">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-[480px] object-cover rounded-xl border border-gray-200"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/80 text-5xl font-semibold select-none">
                Art Feat
              </div>
            </div>
          </div>

          {/* 🔹 العمود الأيمن - تفاصيل النص */}
          <div>
            {/* العنوان */}
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {artwork.title}
            </h1>
            <p className="text-gray-600 mb-4">By {artwork.author}</p>

            {/* التقييم */}
            <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
              {"★".repeat(5)}
              <span className="text-gray-500 ml-2 text-xs">(103 reviews)</span>
            </div>

            {/* السعر */}
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${artwork.price}
            </div>

          
{/* النوع (Tag) */}
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
{/* تفاصيل إضافية */}
<div className="mt-6 border-0 pt-2">
  <details open className="space-y-4">
    <summary className="flex items-center gap-2 cursor-pointer font-semibold text-gray-900 text-base">
      Item Details
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </summary>

    <div className="mt-3 space-y-4 text-sm text-gray-700 leading-relaxed">
      <h4 className="font-semibold text-sky-600 text-sm">Highlights</h4>

      {/* النقاط بالأيقونات */}
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

      {/* الفقرات النصية */}
    <p className="text-gray-600 text-sm pl-6">
  All of our artworks are original, and designed by hand at studio
  diudende. Wake up your walls with artwork from diudende studio!
</p>

<p className="text-gray-600 text-sm pl-6">
  Hand-drawn, sketch style, digital wall art. Hang this minimalistic,
  warm neutral autumn artwork in your kitchen.
</p>

{/* الحجم */}
<div className="flex items-start gap-2">
  <Ruler className="w-4 h-4 text-gray-800 mt-[2px]" />
  <div>
    <p className="text-sm font-semibold text-gray-800">Size:</p>
    <p className="text-gray-600 text-sm">
      {artwork.size}
      {artwork.dpi && (
        <>
          <br />
          {artwork.dpi} dpi
        </>
      )}
    </p>
  </div>
</div>


      {/* Instant Download */}
      <div className="pt-2">
        <p className="text-sky-600 font-semibold text-sm">Instant Download</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Your files will be available on email to download once payment is
          confirmed. Instant download items don’t accept returns, exchanges,
          or cancellations.
        </p>
      </div>
    </div>
  </details>
</div>

          </div>
        </section>

      {/* ================== قسم المقترحات ================== */}
<section className="mt-16">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">
    You may also like
  </h2>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {suggested.slice(0, 3).map((item) => (
      <article
        key={item.id}
        className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
      >
        {/* صورة العمل */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-52 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white/70 text-3xl font-semibold select-none">
            Art Feat
          </div>

          {/* شارة النوع */}
          <span className="absolute top-2 left-2 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {item.type}
          </span>
        </div>

        {/* النصوص */}
        <div className="p-4 space-y-1">
          <p className="text-gray-500 text-sm">by {item.author}</p>
          <p className="text-gray-900 font-semibold text-base truncate">
            {item.title}
          </p>

          {/* السعر + التقييم + عربة */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-gray-900 font-bold text-sm">
                ${item.price}
              </p>
              <div className="flex items-center text-amber-400 text-xs">
                {"★".repeat(5)}
                <span className="text-gray-500 ml-1">(4.8)</span>
              </div>
            </div>

            <button
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
    </main>
  );
};

export default DigitalDetails;
