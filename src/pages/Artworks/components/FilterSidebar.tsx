import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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

/** ✅ الفلاتر الجانبية */
export default function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: { artists: string[]; categories: string[] };
  setFilters: React.Dispatch<
    React.SetStateAction<{ artists: string[]; categories: string[] }>
  >;
}) {
  const artists = ["A.R. Penick", "Alex Katz", "Alison Jackson", "Bernard Venet", "Bryan Adams"];
  const categories = ["Painting", "Sculpture", "Photography", "Print", "Video Media"];

  const toggleFilter = (type: "artists" | "categories", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <aside className="w-full shrink-0 p-4 bg-slate-50">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>

      {/* 🎨 Artist */}
      <CollapsibleSection title="Artist" defaultOpen>
        <ul className="space-y-2 text-sm">
          {artists.map((artist) => (
            <li key={artist} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={filters.artists.includes(artist)}
                onChange={() => toggleFilter("artists", artist)}
              />
              <span>{artist}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* 🖌 Category */}
      <CollapsibleSection title="Category" defaultOpen className="mt-2">
        <ul className="space-y-2 text-sm">
          {categories.map((cat) => (
            <li key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleFilter("categories", cat)}
              />
              <span>{cat}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <button
        onClick={() => setFilters({ artists: [], categories: [] })}
        className="mt-14 w-full rounded-md bg-sky-500 px-4 py-2 text-white text-sm hover:bg-sky-600"
      >
        Clear All
      </button>
    </aside>
  );
}
