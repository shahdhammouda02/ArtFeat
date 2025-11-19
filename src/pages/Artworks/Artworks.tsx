import Hero from "./components/Hero";
import Section2 from "./components/Section2";

export default function Artworks() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero: العنوان + سكشن الصور العريضة */}
      <Hero />

      {/* Grid + Filters */}
      <Section2 />
    </main>
  );
}