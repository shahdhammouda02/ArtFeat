import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { SubNav } from "@/components/layouts/SubNav";

interface AppProps {
  children?: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SubNav />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default App;
