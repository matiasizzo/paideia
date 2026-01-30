import { useState } from "react";
import { CONTENT } from "../constants/content";
import emailjs from '@emailjs/browser';

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
    
    // Inicializa EmailJS
    emailjs.init("qnha6sOiLTKZqwC0s");
    
    // Envía el email
    emailjs.send(
      "service_5zrened",
      "template_begrnpk",
      {
        to_email: "contacto@paideia.com",
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        age: formData.age,
        servicio: formData.servicio,
        mensaje: formData.mensaje,
      }
    ).then((response) => {
      console.log("✅ Email enviado exitosamente:", response);
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
    }).catch(err => {
      console.error("❌ Error al enviar:", err);
      alert("Error al enviar el formulario. Intenta de nuevo.");
    });
  };

  return (
    <>
      {/* Sección Contact */}
      <section id="contact" className="py-10 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8 bg-paideia-cream/20">
        <div className="max-w-3xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-2">
              Contacto
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
                  Enviar Formulario
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
  href="https://wa.me/5491127272113?text=Hola%20Paideia%2C%20vengo%20desde%20la%20web%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20vuestros%20servicios."
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 flex items-center justify-center z-40 transition-all duration-300 hover:scale-110"
>
  <img 
    src="/images/whatsapp-icon.png" 
    alt="WhatsApp"
    className="w-12 h-12 lg:w-16 lg:h-16 object-contain filter drop-shadow-lg"
  />
</a>
    </>
  );
}
