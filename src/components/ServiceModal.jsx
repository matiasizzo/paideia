export function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        style={{ opacity: service ? 1 : 0 }}
        onClick={onClose}
      />
      
      {/* Modal Clean */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white transition-all duration-300 p-8"
        style={{ 
          scale: service ? 1 : 0.9, 
          opacity: service ? 1 : 0,
          visibility: service ? 'visible' : 'hidden'
        }}
      >
        {/* Solo Título + Cómo Funciona */}
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-3xl font-bold text-paideia-primary font-raleway">
            {service.title}
          </h2>
        </div>

        {/* SOLO Cómo Funciona */}
        <div className="space-y-6">
          <div>
            <h4 className="text-2xl font-semibold text-paideia-primary mb-6 font-raleway border-b border-paideia-mint/30 pb-2">
              ¿Cómo funciona?
            </h4>
            <p className="text-lg text-paideia-primary-light font-raleway leading-relaxed text-left whitespace-pre-wrap">
              {service.howItWorks}
            </p>
          </div>
          
          <div className="pt-4 border-t border-paideia-cream/50">
            <button 
              onClick={onClose}
              className="w-full bg-paideia-mint hover:bg-paideia-mint/90 text-white py-3 px-6 rounded-xl font-semibold font-raleway transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
