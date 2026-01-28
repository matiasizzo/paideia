import { Button } from "./common/Button";
import { CONTENT } from "../constants/content";

export default function Hero() {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const descriptionItems = CONTENT.hero.description.split("✔").filter(item => item.trim());

  return (
    <section className="bg-white pt-6 pb-8 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Stack vertical | Desktop: Grid 2 columnas */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          
          {/* Logo - Mobile: Arriba | Desktop: Izquierda */}
          <div className="flex items-center justify-center lg:order-1 mb-8 lg:mb-0">
            <div className="w-full max-w-xs">
              <img 
                src="/images/logo.png" 
                alt="Paideia Logo" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Contenido - Mobile: Centro | Desktop: Derecha */}
          <div className="flex flex-col justify-center space-y-6 lg:order-2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-paideia-primary font-raleway leading-tight">
              {CONTENT.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-paideia-primary-light font-raleway font-light">
              {CONTENT.hero.subtitle}
            </p>

            {/* Lista de beneficios */}
            <div className="space-y-2">
              {descriptionItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm sm:text-base text-paideia-primary/70 font-raleway">
                  <span className="text-paideia-primary font-bold mt-1">✔</span>
                  <span>{item.trim()}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleContactClick}
                className="w-full lg:w-auto bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
