import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/** مكوّن القسم القابل للطي */
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
          className={`h-5 w-5 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
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

/** الفلاتر الجانبية */
export default function FilterSidebar() {
  return (
    <aside className="w-full lg:w-64 shrink-0 border border-slate-200 rounded-xl p-4 bg-slate-100">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>

      {/* 🔹 Artist */}
      <CollapsibleSection title="Artist" defaultOpen>
        <ul className="space-y-2 text-sm">
          {[
            "A.R. Penick",
            "Alex Katz",
            "Alison Jackson",
            "Bernard Venet",
            "Bryan Adams",
          ].map((artist) => (
            <li key={artist} className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
              <span>{artist}</span>
            </li>
          ))}
        </ul>
        <button className="text-sky-600 text-xs mt-2">Show More (3 items)</button>
      </CollapsibleSection>

      {/* 🔹 Category */}
      <CollapsibleSection title="Category" className="mt-2" defaultOpen>
        <ul className="space-y-2 text-sm">
          {["Painting", "Sculpture", "Photography", "Print", "Video Media"].map(
            (cat) => (
              <li key={cat} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                <span>{cat}</span>
              </li>
            )
          )}
        </ul>
      </CollapsibleSection>

      {/* 🔹 Price */}
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
