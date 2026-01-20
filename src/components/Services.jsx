import { useState } from "react";
import { Section } from "./common/Section";
import { Card } from "./common/Card";
import { CONTENT } from "../constants/content";
import { ServiceModal } from "./ServiceModal";

export default function Services() {
  const [openService, setOpenService] = useState(null);

  return (
    <Section id="services" bgColor="bg-white">
      <div className="space-y-12">
        {/* Header igual... */}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.services.map((service) => (
            <Card
              key={service.id}
              className="bg-paideia-cream hover:bg-paideia-coral/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* ← CAMBIO AQUÍ */}
                <img
                  src={service.icon}  // ← ahora "/images/terapia-individual.jpg"
                  alt={service.title}
                  className="w-16 h-16 mx-auto mb-4 object-contain rounded-lg shadow-md"
                />
                <h3 className="text-xl font-bold text-paideia-primary font-raleway">
                  {service.title}
                </h3>
                <p className="text-paideia-primary-light font-raleway font-light">
                  {service.description}
                </p>
              </div>

              <button
                onClick={() => setOpenService(service)}
                className="mt-4 text-sm font-medium text-paideia-primary-light underline font-raleway self-start"
              >
                Ver más
              </button>
            </Card>
          ))}
        </div>
      </div>

      <ServiceModal service={openService} onClose={() => setOpenService(null)} />
    </Section>
  );
}
