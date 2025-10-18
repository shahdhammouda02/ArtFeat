import { Button } from "@/components/ui/button";

export default function JoinAsArtist() {
  return (
    <section className="relative py-28">
      {/* دوائر خلفية هادئة */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-sky-300/30 blur-2xl" />
        <div className="absolute right-10 top-20 h-40 w-40 rounded-full bg-yellow-300/30 blur-2xl" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-green-300/30 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center space-y-6">
        {/* العنوان */}
        <h2 className="text-5xl sm:text-6xl font-extrabold text-black leading-tight">
          Showcase Your Art to The
          <br />
          World
        </h2>

        {/* الفقرة */}
<p className="text-muted-foreground max-w-2xl mx-auto text-lg">
  Join our thriving community of artists. Unleash your creativity, connect with art lovers, and grow your audience globally.
</p>

{/* الزر */}
<Button
  asChild
  className="bg-sky-500 hover:bg-sky-600 text-white transition-colors duration-200 py-6 px-10 text-lg rounded-lg shadow-md mt-32"
>
  <a href="/support-artist">Join as an Artist</a>
</Button>


      </div>
    </section>
  );
}
