import { BRAND } from "../constants/brand";

export default function Footer() {
  return (
    <footer className="bg-paideia-primary text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-raleway">{BRAND.name}</h3>
            <p className="text-paideia-coral font-raleway font-light">
              {BRAND.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-bold font-raleway">Enlaces</h4>
            <ul className="space-y-2 font-raleway font-light">
              <li>
                <a href="#services" className="hover:text-paideia-coral transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-paideia-coral transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-paideia-coral transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold font-raleway">Contacto</h4>
            <div className="space-y-2 font-raleway font-light">
              <p>📧 contacto@paideia.com</p>
              <p>📱 +54 9 XXXX XXXX</p>
              <p>🌍 Online - Argentina / España</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-paideia-primary-light pt-8 text-center text-paideia-coral font-raleway font-light">
          <p>&copy; 2026 {BRAND.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
