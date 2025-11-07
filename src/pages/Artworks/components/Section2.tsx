import { useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { ITEMS } from "@/data/artworks";
import type { Item } from "@/types/artworks";

/** قسم قابل للطي */
function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
  className = "",
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`border-t pt-4 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between"
        aria-expanded={open}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`mt-3 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FilterBlock() {
  return (
<aside className="w-full lg:w-64 shrink-0 border border-slate-200 rounded-xl p-4 bg-slate-100">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>

      {/* Artist */}
      <CollapsibleSection title="Artist" defaultOpen>
        <ul className="space-y-2 text-sm">
          {["A.R. Penick", "Alex Katz", "Alison Jackson", "Bernard Venet", "Bryan Adams"].map(
            (a) => (
              <li key={a} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                <span>{a}</span>
              </li>
            )
          )}
        </ul>
        <button className="text-sky-600 text-xs mt-2">Show More (3 items)</button>
      </CollapsibleSection>

      {/* Category */}
      <CollapsibleSection title="Category" className="mt-2" defaultOpen>
        <ul className="space-y-2 text-sm">
          {["Painting", "Sculpture", "Photography", "Print", "Video Media"].map((c) => (
            <li key={c} className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Price */}
      <CollapsibleSection title="Price" className="mt-2" defaultOpen>
        <div className="flex items-center gap-3">
          <input
            placeholder="Min"
            className="w-1/2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
          <span className="text-slate-400">—</span>
          <input
            placeholder="Max"
            className="w-1/2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </div>
<p className="text-xs text-sky-600 mt-2 font-medium">e.g., 500-2000</p>
      </CollapsibleSection>

  <button className="mt-14 w-full rounded-md bg-sky-500 px-4 py-2 text-white text-sm hover:bg-sky-600">
  Clear All
</button>

    </aside>
  );
}

function Card({ item }: { item: Item }) {
  const tagColor =
    item.tag === "Sculpture"
      ? "bg-amber-500"
      : item.tag === "Photography"
      ? "bg-sky-500"
      : "bg-indigo-600";

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden max-w-[330px] mx-auto">
      <div className="relative aspect-[4/3]">
        <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
        <span
          className={`absolute left-3 top-3 px-3 py-1 text-xs font-medium text-white rounded-full ${tagColor}`}
        >
          {item.tag}
        </span>
        {/* شعار خافت */}
        <span className="absolute inset-0 flex items-center justify-center text-white/70 text-4xl font-semibold select-none">
          Art Feat
        </span>
      </div>

      <div className="p-4">
        <a href="#" className="text-sky-600 text-sm font-medium hover:underline">
          {item.title}
        </a>
        <p className="text-slate-600 text-sm mt-1">
          by <span className="font-medium">{item.artist}</span>
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-slate-900 font-semibold">{item.price}</div>
          <button
            title="Add to cart"
            className="rounded-full p-2 hover:bg-sky-100 text-sky-500 transition"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Section2() {
  return (
    <section className="bg-slate-50 py-10">
{/* <div className="max-w-7xl mx-auto flex gap-6"> */}
<div className="w-full flex gap-6">

        {/* الفلاتر */}
        <FilterBlock />

        {/* الشبكة */}
        <div className="flex-1 pr-6">
          {/* عنوان وعدد النتائج */}
          <div className="mb-8 text-left">
            <h3 className="text-slate-700 text-lg font-medium mb-1">200 Artworks</h3>
          </div>

          {/* 3 بطاقات في كل صف */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {ITEMS.map((it) => (
              <Card key={it.id} item={it} />
            ))}
          </div>

          {/* النص والترقيم */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-sky-600 font-medium">Show 1 to 10 of 20 results</p>

            <div className="flex items-center gap-1">
              <button className="p-2 rounded-md hover:bg-slate-100" title="Prev">
                <ChevronLeft className="h-5 w-5" />
              </button>

              {[1, 2, 3, 4, 0, 10, 11].map((n, i) =>
                n === 0 ? (
                  <span key={i} className="px-2 text-slate-400 select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    className={`h-8 w-8 rounded-md text-sm ${
                      n === 2
                        ? "bg-sky-500 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}

              <button className="p-2 rounded-md hover:bg-slate-100" title="Next">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
