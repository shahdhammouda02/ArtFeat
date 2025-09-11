import auctions from '@/assets/images/auctions.jpeg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auctions");
    const section = document.getElementById("live-auctions");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className="relative flex items-center justify-center h-[80vh] bg-center bg-cover"
      style={{ backgroundImage: `url(${auctions})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Discover Masterpieces, Bid for Legacy.
        </h1>
        <p className="text-base md:text-lg mb-6 leading-relaxed lg:max-w-2xl mx-auto">
          Experience the thrill of live art auctions from around the globe. Your next treasured piece awaits.
        </p>
        <Button
        onClick={handleClick}
          variant="default"
          size="lg"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg px-4 py-2 text-sm md:px-6 md:py-3 md:text-base"
        >
          Explore Auctions
        </Button>
      </div>
    </section>
  )
}

export default HeroSection;
