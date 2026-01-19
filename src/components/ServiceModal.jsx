export function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-paideia-primary font-raleway">
            {service.title}
          </h2>
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <h3 className="mt-3 text-sm font-medium text-paideia-primary-light font-raleway">
          ¿Cómo funciona?
        </h3>
        <p className="mt-2 text-sm text-slate-700 font-raleway">
          {service.howItWorks}
        </p>
      </div>
    </div>
  );
}