import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Nosotros from "./components/Nosotros";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-paideia-cream">
      <Navigation />
      <Hero />
      <Services />
      <Nosotros />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
