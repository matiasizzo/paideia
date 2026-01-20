// ServiceModal.jsx
import { CONTENT } from "../constants/content";

export function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Modal Content */}
      <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-slideUp">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-paideia-primary font-raleway mb-2">
                {service.title}
              </h2>
              <img 
                src={service.icon} 
                alt={service.title}
                className="w-16 h-16 object-contain"
              />
            </div>
            <button
              onClick={onClose}
              className="text-2xl text-paideia-primary-light hover:text-paideia-coral"
            >
              ×
            </button>
          </div>
          
          <p className="text-lg text-paideia-primary-light font-raleway leading-relaxed mb-6">
            {service.description}
          </p>
          
          <div>
            <h4 className="text-xl font-semibold text-paideia-primary mb-4 font-raleway">
              ¿Cómo funciona?
            </h4>
            <p className="text-paideia-primary-light font-light leading-relaxed whitespace-pre-wrap">
              {service.howItWorks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}