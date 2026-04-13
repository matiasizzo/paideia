export default function ComoEmpezar() {
  const pasos = [
    {
      numero: "01",
      titulo: "Agendá tu sesión",
      descripcion: "Elegí el día y horario que mejor te quede y reservá tu entrevista de admisión online.",
    },
    {
      numero: "02",
      titulo: "Tenés tu entrevista",
      descripcion: "Un espacio de 25 minutos con nuestras coordinadoras para conocerte y resolver tus dudas.",
    },
    {
      numero: "03",
      titulo: "Comenzá tu proceso",
      descripcion: "Te conectamos con el profesional que mejor se adapta a vos y a tus necesidades.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-2">
            Cómo empezar terapia en 3 simples pasos
          </h2>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pasos.map((paso, i) => (
            <div key={i} className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-paideia-cream/30 border border-paideia-cream">
              <span className="text-5xl font-bold text-paideia-mint font-raleway mb-4">
                {paso.numero}
              </span>
              <h3 className="text-lg font-bold text-paideia-primary font-raleway mb-2">
                {paso.titulo}
              </h3>
              <p className="text-sm text-paideia-primary/70 font-raleway leading-relaxed">
                {paso.descripcion}
              </p>
              {/* Flecha entre pasos en desktop */}
              {i < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-paideia-mint text-2xl z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Globo explicativo de la entrevista */}
        <div className="relative bg-paideia-primary/5 border-2 border-paideia-mint/40 rounded-3xl p-6 lg:p-8 max-w-3xl mx-auto">
          {/* Puntito decorativo */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-paideia-mint w-6 h-6 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">?</span>
          </div>

          <h3 className="text-lg font-bold text-paideia-primary font-raleway mb-4 text-center">
            ¿En qué consiste la entrevista de admisión?
          </h3>
          <p className="text-sm lg:text-base text-paideia-primary/70 font-raleway leading-relaxed text-center">
            Queremos conocerte para cuidarte mejor. Antes de empezar, te ofrecemos un espacio de <strong>25 minutos</strong> junto a nuestras coordinadoras. Es un momento para que nos cuentes qué te motiva a empezar terapia y para que conozcas nuestra forma de trabajar. Resolvemos tus inquietudes y diseñamos el inicio de tu proceso, asegurándonos de que te sientas acompañado/a y seguro/a en la elección de tu terapeuta.
          </p>

          <div className="text-center mt-6">
            <button
              onClick={() => document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Reservar entrevista
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}