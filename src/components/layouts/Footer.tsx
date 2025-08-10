import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitch, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import artfeatLogo from "@/assets/images/artfeat_logo.jpg";

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 grid gap-8 sm:gap-10 md:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] items-end">
        <div className="space-y-3 md:space-y-5 max-w-xs">
          <img
            src={artfeatLogo}
            alt="ArtFeat Logo"
            className="w-24 md:w-28 lg:w-32 mb-2"
            loading="lazy"
          />
          <p className="font-semibold text-base md:text-lg px-1">
            Get the latest updates
          </p>
          <div className="flex px-1">
            <Input
              placeholder="Enter your email"
              className="rounded-r-none text-sm md:text-base h-9 md:h-11 flex-1"
            />
            <Button
              size="default"
              className="rounded-l-none bg-sky-500 hover:bg-sky-500/90 text-sm md:text-base h-9 md:h-11 px-3 md:px-5"
            >
              Go
            </Button>
          </div>
        </div>

        <div className="space-y-3 md:space-y-5 ml-2 sm:ml-20 lg:ml-0">
          <h3 className="font-semibold text-base md:text-lg">About</h3>
          <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
            <li>
              <a
                href="#"
                onClick={handleLinkClick}
                className="hover:text-sky-500 transition-colors duration-200"
              >
                All Artworks
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleLinkClick}
                className="hover:text-sky-500 transition-colors duration-200"
              >
                Artists
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleLinkClick}
                className="hover:text-sky-500 transition-colors duration-200"
              >
                Auctions
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 md:space-y-5 ml-2 sm:ml-2 lg:ml-0">
          <h3 className="font-semibold text-base md:text-lg">More Info</h3>
          <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
            <li>
              <a
                href="#"
                onClick={handleLinkClick}
                className="hover:text-sky-500 transition-colors duration-200"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleLinkClick}
                className="hover:text-sky-500 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleLinkClick}
                className="hover:text-sky-500 transition-colors duration-200"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 md:space-y-5 ml-2 sm:ml-20 lg:ml-0">
          <h3 className="font-semibold text-base md:text-lg">Follow Us</h3>
          <div className="flex gap-3 md:gap-4 mb-2 md:mb-3">
            <a
              href="#"
              onClick={handleLinkClick}
              className="text-sky-500 hover:text-sky-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 md:w-5 md:h-5" />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              className="text-sky-500 hover:text-sky-600 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 md:w-5 md:h-5" />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              className="text-sky-500 hover:text-sky-600 transition-colors duration-200"
              aria-label="Twitch"
            >
              <Twitch className="w-5 h-5 md:w-5 md:h-5" />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              className="text-sky-500 hover:text-sky-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 md:w-5 md:h-5" />
            </a>
          </div>
          <Button
            size="default"
            className="bg-sky-500 hover:bg-sky-500/90 rounded-xl text-sm md:text-base h-9 md:h-10 px-5 md:px-6"
          >
            Support Artist
          </Button>
        </div>
      </div>

      <Separator className="bg-gray-300" />

      <div className="bg-sky-500 text-white">
        <div className="container mx-auto px-4 py-3 md:py-4 text-center text-xs md:text-sm lg:text-base">
          ©2025 ArtFeat, All rights reserved
        </div>
      </div>
    </footer>
  );
}
