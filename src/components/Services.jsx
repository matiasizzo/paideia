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
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-paideia-primary font-raleway">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-paideia-primary-light font-raleway font-light max-w-2xl mx-auto">
            Ofrecemos acompañamiento profesional en diversas áreas de bienestar mental
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.services.map((service) => (
            <Card
              key={service.id}
              className="bg-paideia-cream hover:bg-paideia-coral/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="text-5xl">{service.icon}</div>
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