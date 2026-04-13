// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Nosotros from "./components/Nosotros";
import Contact from "./components/Contact";
import Reserva from "./components/Reserva";
import Footer from "./components/Footer";
import PagoResultado from "./pages/PagoResultado";
import ComoEmpezar from "./components/ComoEmpezar";
import "./index.css";

function HomePage() {
  return (
    <div className="min-h-screen bg-paideia-cream">
      <Navigation />
      <Hero />
      <ComoEmpezar />
      <Services />
      <Reserva /> 
      <Nosotros />     
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pago/exito" element={<PagoResultado status="success" />} />
        <Route path="/pago/error" element={<PagoResultado status="failure" />} />
        <Route path="/pago/pendiente" element={<PagoResultado status="pending" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;