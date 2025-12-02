import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ArtworksGrid from "./ArtworksGrid";

export default function Section2() {
  // ✅ الحالة التي ستحمل الفلاتر المختارة
  const [filters, setFilters] = useState({
    artists: [] as string[],
    categories: [] as string[],
  });

  return (
    <section className="min-h-screen flex bg-slate-100">
      {/* ✅ الفلتر */}
      <div className="w-[260px] shrink-0 border-r border-slate-200 bg-slate-50 pt-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* ✅ قسم الأعمال بخلفية بيضاء */}
      <div className="flex-1 bg-white">
        <ArtworksGrid filters={filters} />
      </div>
    </section>
  );
}
