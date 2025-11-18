import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { SubNav } from "@/components/layouts/SubNav";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/artist-signup';

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

export default App;