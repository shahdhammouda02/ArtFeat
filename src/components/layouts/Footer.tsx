import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitch, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import logo from '@/assets/images/logo.jpeg'

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full m-0 p-0" style={{ background: 'linear-gradient(135deg, #e5f5fd 0%, #f0f9ff 50%, #e0f2fe 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 grid gap-8 sm:gap-10 md:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] items-end">
        <div className="space-y-3 md:space-y-5 max-w-xs">
          <img
            src={logo}
            alt="ArtFeat Logo"
            className="w-40 md:w-36 lg:w-40 mb-2 mix-blend-multiply bg-transparent"
            loading="lazy"
          />
          <p className="font-semibold text-lg sm:text-base md:text-lg px-1 ml-3 sm:ml-0 lg:ml-2">
            Get the latest updates
          </p>
          <div className="flex px-1 ml-3 sm:ml-0 lg:ml-2">
            <Input
              placeholder="Enter your email"
              className="rounded-r-none text-base sm:text-sm md:text-base h-11 md:h-11 flex-1"
            />
            <Button
              size="default"
              className="rounded-l-none bg-sky-500 hover:bg-sky-500/90 text-lg sm:text-sm md:text-base h-11 md:h-11 px-5 md:px-5"
            >
              Go
            </Button>
          </div>
        </div>

        <div className="space-y-3 md:space-y-5 ml-5 sm:ml-20 lg:ml-0">
          <h3 className="font-semibold text-lg sm:text-base md:text-lg">
            About
          </h3>
          <ul className="space-y-1.5 md:space-y-2 text-base sm:text-sm md:text-base">
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

        <div className="space-y-3 md:space-y-5 ml-5 sm:ml-2 lg:ml-0">
          <h3 className="font-semibold text-lg sm:text-base md:text-lg">
            More Info
          </h3>
          <ul className="space-y-1.5 md:space-y-2 text-base sm:text-sm md:text-base">
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

        <div className="space-y-3 md:space-y-5 ml-5 sm:ml-20 lg:ml-0">
          <h3 className="font-semibold text-lg sm:text-base md:text-lg">
            Follow Us
          </h3>
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
            className="bg-sky-500 hover:bg-sky-500/90 rounded-xl text-lg sm:text-sm md:text-base h-10 md:h-10 px-6 md:px-6"
          >
            Support Artist
          </Button>
        </div>
      </div>

      <Separator className="bg-gray-300" />

      <div className="bg-sky-500 text-white">
        <div className="container mx-auto px-4 py-3 md:py-4 text-center text-lg sm:text-xs md:text-sm lg:text-base">
          ©2025 ArtFeat, All rights reserved
        </div>
      </div>
    </footer>
  );
}
