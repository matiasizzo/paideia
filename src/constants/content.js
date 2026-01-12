export const CONTENT = {
  hero: {
    title: "Un espacio seguro de escucha y diálogo",
    subtitle: "Psicoterapia online con enfoque TCC",
    description: "Acompañamiento profesional para tu bienestar mental",
    cta: "Agendar consulta",
  },
  services: [
    {
      id: 1,
      title: "Ansiedad",
      icon: "🧠",
      description: "Manejo de síntomas y técnicas para encontrar calma",
    },
    {
      id: 2,
      title: "Depresión",
      icon: "💙",
      description: "Acompañamiento en el proceso de recuperación",
    },
    {
      id: 3,
      title: "Relaciones",
      icon: "🤝",
      description: "Trabajo en comunicación y vínculos saludables",
    },
    {
      id: 4,
      title: "Autoestima",
      icon: "✨",
      description: "Fortalecimiento de la confianza en ti mismo",
    },
  ],
  team: [
    {
      id: 1,
      name: "Terapeuta 1",
      role: "Psicóloga Clínica",
      bio: "Especializada en TCC y ansiedad",
      image: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Terapeuta 2",
      role: "Psicólogo Clínico",
      bio: "Especializado en depresión y relaciones",
      image: "👨‍⚕️",
    },
  ],
  contact: {
    title: "Contáctanos",
    subtitle: "Estaremos encantados de acompañarte",
    formFields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Teléfono", type: "tel", required: false },
      { name: "subject", label: "Asunto", type: "text", required: true },
      { name: "message", label: "Mensaje", type: "textarea", required: true },
    ],
  },
};
