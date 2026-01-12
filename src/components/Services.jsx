import { Section } from "./common/Section";
import { Card } from "./common/Card";
import { CONTENT } from "../constants/content";

export default function Services() {
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
            <Card key={service.id} className="bg-paideia-cream hover:bg-paideia-coral/5">
              <div className="space-y-4">
                <div className="text-5xl">{service.icon}</div>
                <h3 className="text-xl font-bold text-paideia-primary font-raleway">
                  {service.title}
                </h3>
                <p className="text-paideia-primary-light font-raleway font-light">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
