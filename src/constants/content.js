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
      title: "Terapia individual",
      icon: "🧠",
      description: "Sesiones uno a uno para trabajar tus objetivos personales y emocionales.",
      howItWorks:
        "Nos reunimos una vez por semana durante 50 minutos. El espacio es confidencial, online o presencial, y vamos definiendo objetivos y tiempos según tus necesidades.",
    },
    {
      id: 2,
      title: "Orientación vocacional",
      icon: "💙",
      description:
        "Acompañamiento para elegir carrera, redireccionar tu camino profesional y tomar decisiones informadas.",
      howItWorks:
        "Realizamos un proceso acotado en el tiempo con entrevistas, ejercicios y devoluciones. Exploramos intereses, fortalezas y opciones concretas de estudio o trabajo.",
    },
    {
      id: 3,
      title: "Supervisión individual",
      icon: "🤝",
      description:
        "Espacio clínico para profesionales que quieran revisar casos y profundizar en su práctica.",
      howItWorks:
        "Encuentros individuales de 50 minutos para psicólogos/as. Trabajamos casos, encuadre, intervenciones y posicionamiento clínico, adaptado a tu nivel de experiencia.",
    },
    {
      id: 4,
      title: "Supervisiones grupales",
      icon: "✨",
      description:
        "Grupos reducidos de intercambio clínico y reflexión guiada sobre casos y encuadre.",
      howItWorks:
        "Grupos cerrados con frecuencia quincenal o mensual. Cada encuentro se organiza en torno a la presentación de casos y la discusión guiada, con bibliografía sugerida.",
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
