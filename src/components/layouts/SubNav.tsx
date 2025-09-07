import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link, useLocation } from "react-router-dom";

const categories = [
  "photography",
  "printmaking",
  "abstract art",
  "paintings",
  "Events",
];

export function SubNav() {
  const location = useLocation();

  // Get the current category from the URL path
  const currentPath = location.pathname.substring(1).replace(/-/g, " ");
  
  // Check if current path matches any category
  const isActiveCategory = (category: string) => {
    return currentPath === category.toLowerCase().replace(/\s+/g, " ");
  };

  return (
    <div className="w-full border-t border-gray-200 bg-gray-100 py-6 overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="hidden sm:block">
          <NavigationMenu orientation="horizontal" className="w-full">
            <NavigationMenuList className="flex flex-nowrap items-center justify-center gap-4 md:gap-7 lg:gap-16 xl:gap-36 max-w-full px-8 md:px-24 lg:px-16 xl:px-32">
              {categories.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                      className={`px-4 py-3 rounded-md transition-colors text-md font-semibold whitespace-nowrap ${
                        isActiveCategory(item) 
                          ? "text-sky-500" 
                          : "text-gray-700 hover:text-sky-500"
                      }`}
                    >
                      {item}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* carousel for responsive */}
        <div className="sm:hidden overflow-x-auto">
          <Carousel orientation="horizontal" className="relative w-full">
            <CarouselContent className="flex gap-2">
              {categories.map((item) => (
                <CarouselItem key={item} className="min-w-[9rem] flex-shrink-0">
                  <Link
                    to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                    className={`block text-center rounded-md transition-colors text-lg font-semibold whitespace-nowrap px-3 py-2 ${
                      isActiveCategory(item)
                        ? "text-sky-500"
                        : "text-gray-700 hover:text-sky-500"
                    }`}
                  >
                    {item}
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}