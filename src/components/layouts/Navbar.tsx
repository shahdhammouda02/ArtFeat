import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Globe, Menu, X } from "lucide-react";
import artfeatLogo from "@/assets/images/artfeat_logo.jpg";

const navItems = [
  "Gallery",
  "Artists",
  "All Artworks",
  "Auctions",
  "Support Artist",
  "Who we are",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href="/" className="flex items-center space-x-2 select-none">
          <img
            src={artfeatLogo}
            alt="ArtFeat Logo"
            className="h-11 w-auto"
            loading="lazy"
            width={45}
            height={45}
            decoding="async"
            fetchPriority="low"
          />
        </a>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-block text-md font-semibold text-gray-800 hover:text-sky-500 transition-transform duration-300 ease-in-out hover:-translate-y-1.5"
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="default" className="font-semibold">
            Login
          </Button>
          <Button
            size="default"
            className="font-semibold bg-sky-400 hover:bg-sky-400/90 border-none"
          >
            Sign Up
          </Button>

          <div className="h-7 border-r border-gray-300 mx-2" />

          <button
            aria-label="Favorites"
            className="text-gray-700 hover:text-red-600"
            type="button"
          >
            <Heart size={22} />
          </button>
          <button
            aria-label="Cart"
            className="text-gray-700 hover:text-sky-600"
            type="button"
          >
            <ShoppingCart size={22} />
          </button>
          <button
            aria-label="Language"
            className="text-gray-700 hover:text-sky-600"
            type="button"
          >
            <Globe size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md flex flex-col items-center justify-center text-center">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-center space-y-3 p-4">
              {navItems.map((item) => (
                <NavigationMenuItem key={item} className="text-center">
                  <NavigationMenuLink
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-block text-gray-800 font-semibold text-base transition-transform duration-150 ease-out hover:text-sky-400 hover:-translate-y-1.5 active:text-sky-400 active:-translate-y-1.5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex flex-col items-center px-4 pb-4 space-y-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="font-semibold w-full max-w-xs"
            >
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              className="font-semibold w-full max-w-xs bg-sky-400 hover:bg-sky-400/90"
            >
              Sign Up
            </Button>

            <div className="flex justify-center space-x-6 mt-2">
              <button
                aria-label="Favorites"
                className="text-gray-700 hover:text-red-600 transition-transform duration-300 ease-in-out hover:-translate-y-1.5"
                type="button"
              >
                <Heart size={20} />
              </button>
              <button
                aria-label="Cart"
                className="text-gray-700 hover:text-sky-600 transition-transform duration-300 ease-in-out hover:-translate-y-1.5"
                type="button"
              >
                <ShoppingCart size={20} />
              </button>
              <button
                aria-label="Language"
                className="text-gray-700 hover:text-sky-600 transition-transform duration-300 ease-in-out hover:-translate-y-1.5"
                type="button"
              >
                <Globe size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
