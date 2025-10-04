import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Globe, Bell, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.jpeg";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  "Gallery",
  "Artists",
  "All Artworks",
  "Auctions",
  "Support Artist",
  "Who we are",
];

// تعريف نوع الإشعار
interface Notification {
  id: number;
  message: string;
  type: string;
  timestamp: Date;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const location = useLocation();

  useEffect(() => {
    const count = parseInt(localStorage.getItem("notificationCount") || "0");
    const storedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );

    setNotificationCount(count);
    setNotifications(storedNotifications);

    const handleNotificationUpdate = () => {
      const updatedCount = parseInt(
        localStorage.getItem("notificationCount") || "0"
      );
      const updatedNotifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );

      setNotificationCount(updatedCount);
      setNotifications(updatedNotifications);
    };

    window.addEventListener("notificationUpdate", handleNotificationUpdate);

    return () => {
      window.removeEventListener(
        "notificationUpdate",
        handleNotificationUpdate
      );
    };
  }, []);
  const clearNotifications = () => {
    localStorage.setItem("notifications", JSON.stringify([]));
    localStorage.setItem("notificationCount", "0");
    setNotifications([]);
    setNotificationCount(0);
    setNotificationOpen(false);
  };

  const currentPath = location.pathname.substring(1).replace(/-/g, " ");

  const isActiveNavItem = (item: string) => {
    return currentPath === item.toLowerCase().replace(/\s+/g, " ");
  };

  return (
    <nav
      className="w-full bg-white border-b border-gray-200 shadow-md sticky top-0 z-50"
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto flex items-center justify-between h-24 px-4">
        <Link
          to="/"
          className="flex items-center space-x-2 select-none"
          aria-label="Go to homepage"
        >
          <img
            src={logo}
            alt="ArtFeat Logo"
            className="h-24 w-auto mix-blend-multiply bg-transparent"
            loading="lazy"
            width={300}
            height={200}
            decoding="async"
            fetchPriority="low"
          />
        </Link>

        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4 items-center">
              {navItems.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                      className={`inline-block text-base font-semibold transition-transform duration-300 ease-in-out hover:-translate-y-1.5 ${
                        isActiveNavItem(item)
                          ? "text-sky-500"
                          : "text-gray-800 hover:text-sky-500"
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

        <div className="hidden lg:flex items-center space-x-3">
          <Button
            variant="outline"
            size="default"
            className="font-semibold"
            aria-label="Login"
          >
            Login
          </Button>
          <Button
            size="default"
            className="font-semibold bg-sky-400 hover:bg-sky-400/90 border-none"
            aria-label="Sign Up"
          >
            Sign Up
          </Button>

          <div
            className="h-7 border-r border-gray-300 mx-2"
            aria-hidden="true"
          />

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

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button
              aria-label="Notifications"
              className="text-gray-700 hover:text-yellow-500 relative"
              type="button"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Bell size={22} />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-sky-600 hover:text-sky-800"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:flex lg:hidden items-center space-x-4">
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

          {/* Notification Bell for Mobile (with dropdown) */}
          <div className="relative">
            <button
              aria-label="Notifications"
              className="text-gray-700 hover:text-yellow-500 relative"
              type="button"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Bell size={22} />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-sky-600 hover:text-sky-800"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-gray-200 shadow-md flex flex-col items-center justify-center text-center"
          role="menu"
          aria-label="Mobile menu"
        >
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-center space-y-3 p-4">
              {navItems.map((item) => (
                <NavigationMenuItem
                  key={item}
                  className="text-center"
                  role="menuitem"
                >
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                      className={`inline-block font-semibold text-base transition-transform duration-150 ease-out hover:-translate-y-1.5 ${
                        isActiveNavItem(item)
                          ? "text-sky-500"
                          : "text-gray-800 hover:text-sky-400"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </Link>
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
              aria-label="Login"
            >
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              className="font-semibold w-full max-w-xs bg-sky-400 hover:bg-sky-400/90"
              aria-label="Sign Up"
            >
              Sign Up
            </Button>

            <div className="flex justify-center space-x-6 mt-2 sm:hidden">
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

              {/* Notification Bell for Mobile (with dropdown) */}
              <div className="relative">
                <button
                  aria-label="Notifications"
                  className="text-gray-700 hover:text-yellow-500 relative"
                  type="button"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  <Bell size={22} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearNotifications}
                          className="text-xs text-sky-600 hover:text-sky-800"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-3 border-b border-gray-100 hover:bg-gray-50"
                          >
                            <p className="text-sm text-gray-700">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                notification.timestamp
                              ).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications yet
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
