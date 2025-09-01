import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/images/art-gallery.jpeg";

export default function Section1() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/events");
    const section = document.getElementById("art-events");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tighter">
              Discover Your Next
              <br />
              <span className="text-sky-500">Artistic Journey</span>
            </h1>

            <p className="mt-6 md:mt-3 lg:mt-6 text-lg sm:text-xl md:text-base lg:text-lg text-gray-600 max-w-[45ch] leading-relaxed">
              Explore captivating events and talented artists from around the
              globe, fostering creativity and connection.
            </p>

            <div className="mt-8 md:mt-4 lg:mt-8">
              <Button
                onClick={handleClick}
                aria-label="Go to Events section"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                Explore Events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <img
              src={heroImg}
              alt="Bright art studio with easels and paintings"
              className="w-full h-auto rounded-2xl shadow-xl object-cover max-h-[600px] md:max-h-[700px]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
