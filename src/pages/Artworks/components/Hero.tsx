export default function Hero() {
  const artworks = [
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
      height: "h-72",
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
      height: "h-80",
    },
    {
      src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=900&auto=format&fit=crop",
      height: "h-96",
    },
    {
      src: "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=800&auto=format&fit=crop",
      height: "h-80",
    },
    {
      src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=800&auto=format&fit=crop",
      height: "h-72",
    },
  ];

  return (
    <section className="py-20 text-center bg-white">
      {/* العنوان */}
      <h1 className="text-4xl sm:text-5xl font-medium text-sky-600 uppercase tracking-wide">
        Discover Our Curated Artworks
      </h1>

      {/* الفقرة */}
      <p className="mt-4 text-gray-600 text-lg font-light leading-relaxed max-w-3xl mx-auto">
        Explore a world of creativity and passion through our carefully selected
        collection of contemporary and modern art, bringing beauty and
        inspiration to your space.
      </p>

      {/* الصور بأطوال مختلفة */}
      <div className="mt-10 flex justify-center items-end gap-6 flex-wrap sm:flex-nowrap">
        {artworks.map((art, i) => (
          <img
            key={i}
            src={art.src}
            alt={`artwork-${i}`}
            className={`${art.height} w-48 sm:w-52 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105`}
          />
        ))}
      </div>
    </section>
  );
}
