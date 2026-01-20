import { useState, useRef } from "react";
import { Section } from "./common/Section";
import { Button } from "./common/Button";
import { CONTENT } from "../constants/content";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        "service_5zrened", // ← TU Service ID
        "template_begrnpk",      // ← TU Template ID
        formRef.current,
        "qnha6sOiLTKZqwC0s"     // ← TU Public Key
      );
      setStatus("✅ ¡Gracias! Te contactaremos pronto. 😊");
      formRef.current.reset();
    } catch (error) {
      setStatus("❌ Error al enviar. Intentá de nuevo.");
      console.error("EmailJS error:", error);
    } finally {
      setIsSending(false);
    }
  };

  const sendWhatsApp = () => {
    const name = formRef.current?.fullName?.value || "";
    const phone = formRef.current?.phone?.value || "";
    const message = `Hola! Soy ${name}. 
Edad: ${formRef.current?.age?.value || ""} años
Motivo: ${formRef.current?.motivo?.value || ""}
Extra: ${formRef.current?.extra?.value || ""}`;
    
    const whatsappUrl = `https://wa.me/5491127272113?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Section id="contact" bgColor="bg-white">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-paideia-primary font-raleway">
            {CONTENT.contact.title}
          </h2>
          <p className="text-lg text-paideia-primary-light font-raleway font-light">
            {CONTENT.contact.subtitle}
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          {CONTENT.contact.formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-semibold text-paideia-primary font-raleway mb-2"
              >
                {field.label}
                {field.required && <span className="text-paideia-coral-accent">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-paideia-cream focus:border-paideia-primary focus:outline-none font-raleway transition-colors"
                  placeholder={`Tu ${field.label.toLowerCase()}...`}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  className="w-full px-4 py-3 rounded-lg border-2 border-paideia-cream focus:border-paideia-primary focus:outline-none font-raleway transition-colors"
                  placeholder={`Tu ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}

          <Button type="submit" size="lg" variant="primary" className="w-full" disabled={isSending}>
            {isSending ? "Enviando..." : "Enviar por Email"}
          </Button>
        </form>

        {/* WhatsApp */}
        <div className="text-center py-6">
          <p className="text-sm text-slate-500 mb-3 font-raleway">O escribinos directo:</p>
          <button
            onClick={sendWhatsApp}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold font-raleway transition-colors"
          >
            📱 WhatsApp (+54 9 11 2727-2113)
          </button>
        </div>

        {status && (
          <div className="text-center font-raleway py-4 px-6 rounded-lg bg-paideia-mint/20 border-2 border-paideia-mint">
            {status}
          </div>
        )}
      </div>
    </Section>
  );
}