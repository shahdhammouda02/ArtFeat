
import FilterSidebar from "./FilterSidebar";
import ArtworksGrid from "./ArtworksGrid";

export default function Section2() {
  return (
    <section className="bg-slate-50 py-10">
      <div className="w-full flex gap-6">
        <FilterSidebar />
        <ArtworksGrid />
      </div>
    </section>
  );
}
