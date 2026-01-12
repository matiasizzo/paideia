import { Button } from "./common/Button";
import { CONTENT } from "../constants/content";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-paideia-cream via-white to-paideia-coral/10 py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-paideia-primary font-raleway leading-tight">
                {CONTENT.hero.title}
              </h1>
            </div>

            <p className="text-xl text-paideia-primary-light font-raleway font-light">
              {CONTENT.hero.subtitle}
            </p>

            <p className="text-lg text-paideia-primary/80 font-raleway">
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

          {/* Elemento Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-paideia-primary to-paideia-primary-light rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
