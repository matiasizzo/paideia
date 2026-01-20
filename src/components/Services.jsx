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
    className="group bg-paideia-cream hover:bg-paideia-primary/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-paideia-cream/50 hover:border-paideia-mint/50 overflow-hidden"
  >
    <div className="space-y-4 text-center p-6 h-full flex flex-col justify-between"
      onClick={() => setOpenService(service)}>
      {/* Tu imagen perfecta */}
      <img
        src={service.icon}
        alt={service.title}
        className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 object-cover rounded-2xl shadow-xl bg-gradient-to-br from-paideia-mint/20 to-paideia-cream/30 p-2 transition-all"
      />
      
      <div className="space-y-3 flex-1">
        <h3 className="text-xl font-bold text-paideia-primary font-raleway group-hover:text-paideia-mint transition-colors">
          {service.title}
        </h3>
        <p className="text-paideia-primary-light font-raleway font-light leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* "Ver más" solo visual */}
      <div className="pt-2">
        <span className="text-sm font-medium text-paideia-primary-light underline font-raleway group-hover:text-paideia-mint transition-colors">
          Tocá para más info →
        </span>
      </div>
    </div>
  </Card>
          ))}
        </div>
      </div>

      <ServiceModal service={openService} onClose={() => setOpenService(null)} />
    </Section>
  );
}
