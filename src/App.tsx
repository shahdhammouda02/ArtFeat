import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { SubNav } from "@/components/layouts/SubNav";
import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ArtworkProvider } from "@/contexts/ArtworkProvider";
import { CollectionProvider } from "@/contexts/CollectionProvider";
import { CartProvider } from "@/contexts/CartProvider";

const AppContent = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/artist-signup";

  return (
    <div className="flex flex-col min-h-screen m-0 p-0">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <SubNav />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ArtworkProvider>
        <CollectionProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </CollectionProvider>
      </ArtworkProvider>
    </AuthProvider>
  );
};

export default App;
