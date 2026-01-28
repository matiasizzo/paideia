import { CONTENT } from "../constants/content";

export default function About() {
  return (
    <section id="nosotros" className="py-10 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center lg:text-center">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-8">
          {CONTENT.nosotros.title}
        </h2>

        {/* Imagen */}
        <div className="flex justify-center mb-8 lg:mb-10">
          <div className="w-full max-w-xs lg:max-w-sm">
            <img 
              src={CONTENT.nosotros.image} 
              alt="Equipo Paideia"
              className="w-full h-auto rounded-3xl shadow-lg object-cover aspect-square"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {CONTENT.nosotros.text.split('\n\n').map((paragraph, index) => (
            <p 
              key={index}
              className="text-sm sm:text-base text-paideia-primary/70 font-raleway leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
