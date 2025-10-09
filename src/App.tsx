import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { SubNav } from "@/components/layouts/SubNav";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen m-0 p-0">
      <Navbar />
      <SubNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
