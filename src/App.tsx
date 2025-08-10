import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";

interface AppProps {
  children?: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default App;
