import { useState } from "react";
import { Section } from "./common/Section";
import { Button } from "./common/Button";
import { CONTENT } from "../constants/content";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
    console.log("Formulario enviado:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border-2 border-paideia-cream focus:border-paideia-primary focus:outline-none font-raleway transition-colors"
                  placeholder={`Tu ${field.label.toLowerCase()}...`}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full px-4 py-3 rounded-lg border-2 border-paideia-cream focus:border-paideia-primary focus:outline-none font-raleway transition-colors"
                  placeholder={`Tu ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <Button type="submit" size="lg" variant="primary" className="w-full">
            Enviar mensaje
          </Button>
        </form>

        {/* Success Message */}
        {submitted && (
          <div className="bg-paideia-mint/20 border-l-4 border-paideia-mint text-paideia-primary p-4 rounded font-raleway">
            ✅ ¡Gracias! Tu mensaje ha sido enviado correctamente.
          </div>
        )}
      </div>
    </Section>
  );
}
