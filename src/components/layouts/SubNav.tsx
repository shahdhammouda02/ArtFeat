import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const categories = [
  "photography",
  "printmaking",
  "abstract art",
  "paintings",
  "Events",
];

export function SubNav() {
  return (
    <div className="w-full border-t border-gray-200 bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <NavigationMenu orientation="horizontal" className="w-full">
          <NavigationMenuList className="flex flex-row items-center justify-center gap-32 px-6">
            {categories.map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink asChild>
                  <Link
                    to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-gray-700 hover:text-sky-600 px-4 py-3 rounded-md transition-colors text-lg font-semibold"
                  >
                    {item}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

