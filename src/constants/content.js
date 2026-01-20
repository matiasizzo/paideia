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
      icon: "/images/services1.png",
      description:
        "Un espacio de escucha y acompañamiento pensado para vos. Trabajamos de manera personalizada desde el enfoque cognitivo-conductual.",
      howItWorks:
        "El proceso comienza con una breve entrevista de admisión con una de las coordinadoras, donde conversamos sobre tu motivo de consulta, disponibilidad horaria y preferencias. En este primer encuentro también te explicamos en qué consiste la Terapia Cognitivo-Conductual (TCC) y cómo trabajamos. Luego, realizamos la derivación al profesional que mejor se ajuste a tus necesidades, para que puedas iniciar tu proceso terapéutico acompañado/a de la persona más adecuada para vos ☺️",
    },
    {
      id: 2,
      title: "Orientación vocacional",
      icon: "/images/services2.png",
      description:
        "Un proceso para pensar tu presente y tu futuro con mayor claridad. Te acompañamos a explorar tus intereses, habilidades y valores.",
      howItWorks:
        "Comenzamos con una entrevista de admisión con una de las coordinadoras, donde indagamos sobre tu momento actual, tus inquietudes vocacionales, disponibilidad horaria y preferencias. En este primer encuentro te explicamos cómo es el proceso de orientación vocacional y qué herramientas utilizamos. Luego, realizamos la derivación al profesional que mejor se adapte a tus necesidades, para acompañarte en la construcción de un proyecto alineado con tus intereses, habilidades y valores.",
    },
    {
      id: 3,
      title: "Supervisión individual",
      icon: "/images/services3.png",
      description:
        "Un espacio de apoyo para profesionales de la salud mental, donde reflexionamos sobre la práctica clínica desde una mirada cognitivo-conductual.",
      howItWorks:
        "El encuentro se coordina de manera individual y participan las coordinadoras de la red, quienes brindan soporte clínico al caso presentado, promoviendo el intercambio de miradas y un acompañamiento profesional enriquecedor. Siempre con un enfoque TCC.",
    },
    {
      id: 4,
      title: "Supervisión grupal",
      icon: "/images/services4.png",
      description:
        "Un espacio de encuentro entre colegas para compartir experiencias, pensar casos en conjunto y seguir creciendo profesionalmente.",
      howItWorks:
        "Se fija una fecha mensual para el encuentro, al que pueden sumarse estudiantes avanzados y profesionales psicólogos. La participación puede ser presentando un caso o asistiendo como oyente, favoreciendo el intercambio y la reflexión clínica conjunta. Los cupos son limitados para garantizar un espacio cuidado y de calidad.",
    },
  ],
  team: [
    {
      id: 1,
      name: "Dra. María López",
      role: "Psicóloga Clínica",
      bio: "Especializada en TCC para ansiedad y estrés postraumático",
      image: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Dr. Carlos Ramírez",
      role: "Psicólogo Clínico",
      bio: "Experto en TCC para depresión y orientación vocacional",
      image: "👨‍⚕️",
    },
    {
      id: 3,
      name: "Lic. Ana García",
      role: "Psicóloga Supervisora",
      bio: "Formación en supervisión clínica con enfoque cognitivo-conductual",
      image: "👩‍⚕️",
    },
    {
      id: 4,
      name: "Lic. Javier Torres",
      role: "Psicólogo Clínico",
      bio: "Especialista en supervisión grupal y terapia individual TCC",
      image: "👨‍⚕️",
    },
  ],
  contact: {
    title: "Contáctanos",
    subtitle: "Estaremos encantados de acompañarte",
    formFields: [
      { name: "fullName", label: "Nombre y apellido", type: "text", required: true },
      { name: "phone", label: "Número de teléfono (WhatsApp)", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "age", label: "Edad", type: "number", required: true },
      { name: "motivo", label: "¿Por qué te gustaría empezar terapia?", type: "textarea", required: true },
      { name: "extra", label: "¿Algo más que agregar o consultar?", type: "textarea", required: false },
    ],
  },
};
