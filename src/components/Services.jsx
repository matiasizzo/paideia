import { useState } from "react";
import { CONTENT } from "../constants/content";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-paideia-cream/20 rounded-t-3xl -mt-8 lg:mt-0 lg:rounded-none">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-2">
            Nuestros servicios
          </h2>
        </div>

        {/* Grid: 2 cols en mobile, 4 cols en desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-md lg:max-w-full mx-auto">
          {CONTENT.services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-paideia-cream/50 p-4 lg:p-6 flex flex-col h-full cursor-pointer hover:scale-105 active:scale-95"
            >
              {/* Icono - centrado */}
              <div className="mb-3 lg:mb-4 flex justify-center">
                <img 
                  src={service.icon} 
                  alt={service.title}
                  className="w-16 h-16 lg:w-24 lg:h-24 object-contain" 
                />
              </div>

              {/* Título - centrado */}
              <h3 className="text-sm lg:text-lg font-bold text-paideia-primary font-raleway mb-2 lg:mb-3 text-center">
                {service.title}
              </h3>

              {/* Descripción - solo en desktop, centrada */}
              <p className="hidden lg:block text-sm text-paideia-primary/70 font-raleway leading-relaxed mb-4 flex-grow text-center">
                {service.description}
              </p>

              {/* Botón Más info - centrado */}
              <button className="text-[10px] lg:text-sm font-semibold text-paideia-primary hover:text-paideia-primary-light transition-colors mt-auto text-center w-full">
                + Más info
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header modal */}
            <div className="sticky top-0 bg-white border-b border-paideia-cream p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedService.icon} 
                  alt={selectedService.title}
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                />
                <h2 className="text-2xl font-bold text-paideia-primary font-raleway">
                  {selectedService.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-paideia-primary/60 hover:text-paideia-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body modal */}
            <div className="p-6 space-y-6">
              {/* Descripción */}
              <div>
                <h3 className="text-lg font-bold text-paideia-primary font-raleway mb-3">
                  Descripción
                </h3>
                <p className="text-paideia-primary/70 font-raleway leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* ¿Cómo funciona? */}
              <div>
                <h3 className="text-lg font-bold text-paideia-primary font-raleway mb-3">
                  ¿Cómo funciona?
                </h3>
                <p className="text-paideia-primary/70 font-raleway leading-relaxed">
                  {selectedService.howItWorks}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    setSelectedService(null); // 1) Cierra la modal
                    if (contactSection) {
                      setTimeout(() => {
                        contactSection.scrollIntoView({ behavior: "smooth" }); // 2) Luego hace scroll suave
                      }, 200); // pequeño delay para que la modal termine de cerrarse
                    }
                  }}
                  className="flex-1 bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Contactar
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-paideia-cream hover:bg-paideia-cream/80 text-paideia-primary font-raleway font-bold py-3 px-6 rounded-lg transition-colors border border-paideia-cream"
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
