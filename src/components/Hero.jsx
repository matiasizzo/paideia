import { Button } from "./common/Button";
import { CONTENT } from "../constants/content";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-paideia-cream via-white to-paideia-coral/10 py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          {/* Contenido */}
          <div className="flex flex-col justify-center space-y-6 flex-1">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-paideia-primary font-raleway leading-tight">
                {CONTENT.hero.title}
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-paideia-primary-light font-raleway font-light">
              {CONTENT.hero.subtitle}
            </p>

            <p className="text-base sm:text-lg text-paideia-primary/80 font-raleway">
              {CONTENT.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" variant="primary">
                {CONTENT.hero.cta}
              </Button>
              <Button size="lg" variant="outline">
                Más información
              </Button>
            </div>
          </div>

          {/* Logo SVG */}
          <div className="flex items-center justify-center flex-1">
            <img 
              src="/images/logo.png" 
              alt="Paideia Logo" 
              className="w-full max-w-xs h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
