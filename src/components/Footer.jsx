export default function Footer() {
  return (
    <footer className="bg-paideia-primary text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Sección Contacto */}
        <div className="mb-8 pb-8 border-b border-white/20">
          <h4 className="font-bold font-raleway mb-4 text-lg">Contacto</h4>
          <ul className="space-y-3 font-raleway text-sm">
            <li>
              <a 
                href="https://wa.me/5491127272113?text=Hola%20Paideia%2C%20vengo%20desde%20la%20web%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20vuestros%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paideia-coral transition flex items-center gap-2"
              >
                <img 
                  src="/images/whatsapp-icon.png" 
                  alt="WhatsApp"
                  className="w-5 h-5 object-contain"
                />
                +54 9 11 2727-2113
              </a>
            </li>
            <li>
              <a 
                href="mailto:contacto@paideia.com" 
                className="hover:text-paideia-coral transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                paideiapsi@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-raleway text-sm text-paideia-coral/80">
            © 2026 Paideia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
