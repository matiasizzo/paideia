import { Section } from "./common/Section";
import { CONTENT } from "../constants/content";

export default function Nosotros() {  // ← Cambia nombre función
  return (
    <Section id="nosotros" bgColor="bg-paideia-cream/20">  {/* id=team → id=nosotros */}
      <div className="max-w-5xl mx-auto py-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-raleway-semibold text-paideia-primary">
            Nuestra historia
          </h2>
        </div>

        {/* Imagen + Texto */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={CONTENT.nosotros.image}
              alt="Equipo Paideia"
              className="w-full h-[400px] lg:h-[500px] mx-auto object-contain"
            />
          </div>
          
          <div className="space-y-6 prose prose-lg max-w-none">
            <p className="font-raleway-light text-xl text-paideia-primary-light leading-relaxed whitespace-pre-wrap">
              {CONTENT.nosotros.text}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
