import { useState } from "react";
import { CONTENT } from "../constants/content";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    servicio: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        age: "",
        servicio: "",
        mensaje: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      {/* Sección Contact */}
      <section id="contact-section" className="py-10 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8 bg-paideia-cream/20">
        <div className="max-w-3xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-2">
              Contact
            </h2>
            <p className="text-sm sm:text-base text-paideia-primary/70 font-raleway hidden lg:block">
              Estaremos encantados de acompañarte
            </p>
          </div>

          {/* Formulario */}
          {!submitted ? (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border lg:border-paideia-cream lg:p-8 lg:sm:p-12">
              {/* Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm lg:text-base placeholder-paideia-primary/50"
                  placeholder="Nombre y apellido"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm lg:text-base placeholder-paideia-primary/50"
                  placeholder="Número de teléfono/WhatsApp"
                />
              </div>

              {/* Email y Edad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm lg:text-base placeholder-paideia-primary/50"
                  placeholder="Correo electrónico"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm lg:text-base placeholder-paideia-primary/50"
                  placeholder="Edad"
                />
              </div>

              {/* Servicio */}
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm lg:text-base placeholder-paideia-primary/50"
              >
                <option value="">Qué servicio...</option>
                <option value="Terapia individual">Terapia individual</option>
                <option value="Orientación vocacional">Orientación vocacional</option>
                <option value="Supervisión individual">Supervisión individual</option>
                <option value="Supervisión grupal">Supervisión grupal</option>
              </select>

              {/* Mensaje */}
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-2xl focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm lg:text-base placeholder-paideia-primary/50 resize-none"
                placeholder="Cuéntanos..."
              />

              {/* Botón Enviar - Desktop y Mobile */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Enviar por Email
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-paideia-primary/10 border-2 border-paideia-primary rounded-2xl p-8 text-center">
              <svg className="w-12 h-12 text-paideia-primary mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg lg:text-xl font-bold text-paideia-primary font-raleway mb-1">
                ¡Gracias!
              </h3>
              <p className="text-xs lg:text-sm text-paideia-primary/70 font-raleway">
                Te contactaremos pronto
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Burbuja WhatsApp Flotante - Fija en toda la web */}
{/* Burbuja WhatsApp Flotante - Fija en toda la web */}
      <a
       href="https://wa.me/5491127272113?text=Hola%20Paideia%2C%20vengo%20desde%20la%20web%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 w-16 h-16 lg:w-20 lg:h-20 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110"
      >
        <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.527-3.06 6.694-.014 9.188 1.396 1.141 3.54 1.856 5.44 1.856 1.555 0 3.062-.501 4.334-1.458 3.072-2.509 3.218-6.671.575-9.195a9.87 9.87 0 00-4.304-1.769zm7.773-0.327c-.956-1.294-2.471-2.203-4.096-2.441 1.624.227 3.139 1.137 4.096 2.441z"/>
        </svg>
      </a>
    </>
  );
}
