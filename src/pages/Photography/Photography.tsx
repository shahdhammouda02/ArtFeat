const PHOTOGRAPHY_ARTWORKS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Photography() {
  return (
    <main className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* القسم الأول */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900">
              printmaking
            </h1>
            <p className="text-slate-700 text-lg leading-relaxed">
              Printmaking: The Art of Palestinian Detail Discover the beauty of
              Palestinian printmaking, where traditional craftsmanship meets modern
              creativity. Each piece reflects the identity and culture of Palestine
              with unique artistic touches.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop"
              className="w-full h-[330px] object-cover rounded-[40px] shadow-md"/>
          </div>
        </section>

        {/* القسم الثاني */}
        <section className="space-y-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            The Artworks That Belong To This Section
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {PHOTOGRAPHY_ARTWORKS.map((art) => (
              <div
                key={art.id}
                className="relative w-[220px] sm:w-[240px] mx-auto">
                <img
                  src={art.img}
                  className="w-full h-[120px] object-cover rounded-[22px] shadow"/>
                <p className="
                  absolute inset-0 flex items-center justify-center 
                  text-white text-xl font-light tracking-wide">
                  Artfeat
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
