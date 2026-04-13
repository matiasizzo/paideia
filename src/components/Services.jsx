import { useState } from "react";
import { CONTENT } from "../constants/content";

const WA_URL = "https://wa.me/5491127272113?text=Hola%20Paideia%2C%20vengo%20desde%20la%20web%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n.";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  function handleCTA(service) {
    setSelectedService(null);
    if (service.cta === "agenda") {
      setTimeout(() => {
        document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      window.open(WA_URL, "_blank");
    }
  }

  return (
    <section id="services" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-paideia-cream/20 rounded-t-3xl -mt-8 lg:mt-0 lg:rounded-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-2">
            Nuestros servicios
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-md lg:max-w-full mx-auto">
          {CONTENT.services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-paideia-cream/50 p-4 lg:p-6 flex flex-col h-full cursor-pointer hover:scale-105 active:scale-95"
            >
              <div className="mb-3 lg:mb-4 flex justify-center">
                <img src={service.icon} alt={service.title} className="w-16 h-16 lg:w-24 lg:h-24 object-contain" />
              </div>
              <h3 className="text-sm lg:text-lg font-bold text-paideia-primary font-raleway mb-1 lg:mb-2 text-center">
                {service.title}
              </h3>
              <p className="hidden lg:block text-xs text-paideia-primary/50 font-raleway text-center mb-3">
                {service.subtitle}
              </p>
              <p className="hidden lg:block text-sm text-paideia-primary/70 font-raleway leading-relaxed mb-4 flex-grow text-center">
                {service.description}
              </p>
              <button className="text-[10px] lg:text-sm font-semibold text-paideia-primary hover:text-paideia-primary-light transition-colors mt-auto text-center w-full">
                + Más info
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-paideia-primary font-raleway">
                  {selectedService.title}
                </h2>
                <p className="text-sm text-paideia-primary/50 font-raleway mt-1">
                  {selectedService.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-paideia-primary/40 hover:text-paideia-primary transition-colors ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-paideia-primary font-raleway mb-3 border-b border-paideia-mint/30 pb-2">
                  ¿Cómo funciona?
                </h4>
                <p className="text-paideia-primary/70 font-raleway leading-relaxed">
                  {selectedService.howItWorks}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-paideia-cream/50">
                <button
                  onClick={() => handleCTA(selectedService)}
                  className="flex-1 bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {selectedService.ctaLabel}
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-paideia-cream hover:bg-paideia-cream/80 text-paideia-primary font-raleway font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}