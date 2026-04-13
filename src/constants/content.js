export const CONTENT = {
  hero: {
    title: "Psicoterapia online con enfoque cognitivo-conductual",
    subtitle: "Un espacio de escucha profesional para acompañarte a generar cambios reales en tu bienestar.",
    description: "✔ Atención online ✔ Profesionales formados en TCC ",
    cta: "Agendar consulta",
  },
  services: [
    {
      id: 1,
      title: "Terapia individual",
      subtitle: "Encontrá el terapeuta ideal para vos.",
      icon: "/images/services1.png",
      description: "Un espacio de escucha y acompañamiento pensado para vos. Trabajamos de manera personalizada desde el enfoque Cognitivo-Conductual (TCC) para brindarte herramientas concretas que te ayuden a transitar tus desafíos. Nuestro compromiso es acompañarte con calidez y evidencia científica en cada paso de tu proceso.",
      howItWorks: "El proceso comienza con una breve entrevista de admisión con una de las coordinadoras, donde conversamos sobre tu motivo de consulta, disponibilidad horaria y preferencias. En este primer encuentro también te explicamos en qué consiste la Terapia Cognitivo-Conductual (TCC) y cómo trabajamos. Luego, realizamos la derivación al profesional que mejor se ajuste a tus necesidades, para que puedas iniciar tu proceso terapéutico acompañado/a de la persona más adecuada para vos ☺️",
      cta: "agenda",
      ctaLabel: "Agendar y pagar admisión",
    },
    {
      id: 2,
      title: "Orientación vocacional",
      subtitle: "Diseñá tu futuro con claridad.",
      icon: "/images/services2.png",
      description: "Te acompañamos a explorar tus intereses, habilidades y valores para que tu elección sea un proyecto que te entusiasme. A través de un proceso dinámico y guiado, transformamos la incertidumbre en una hoja de ruta clara para que puedas tomar decisiones con seguridad y construir un camino alineado con quien sos.",
      howItWorks: "Comenzamos con una entrevista de admisión con una de las coordinadoras, donde indagamos sobre tu momento actual, tus inquietudes vocacionales, disponibilidad horaria y preferencias. En este primer encuentro te explicamos cómo es el proceso de orientación vocacional y qué herramientas utilizamos. Luego, realizamos la derivación al profesional que mejor se adapte a tus necesidades.",
      cta: "agenda",
      ctaLabel: "Agendar y pagar admisión",
    },
    {
      id: 3,
      title: "Supervisión individual",
      subtitle: "Fortalecé tu práctica profesional.",
      icon: "/images/services3.png",
      description: "Un espacio de apoyo para colegas donde reflexionamos juntos sobre la práctica clínica. Te brindamos soporte técnico desde la mirada TCC para destrabar casos y potenciar tus intervenciones. Es un encuentro flexible de 'par a par', pensado para que te sientas respaldado y seguro en tu rol profesional.",
      howItWorks: "El encuentro se coordina de manera individual y participan las coordinadoras de la red, quienes brindan soporte clínico al caso presentado, promoviendo el intercambio de miradas y un acompañamiento profesional enriquecedor. Siempre con un enfoque TCC.",
      cta: "whatsapp",
      ctaLabel: "Consultar por WhatsApp",
    },
    {
      id: 4,
      title: "Supervisión grupal",
      subtitle: "El valor de la mirada colectiva.",
      icon: "/images/services4.png",
      description: "Un encuentro mensual para compartir experiencias y seguir creciendo en comunidad. Ya sea presentando un caso o participando como oyente, favorecemos el intercambio de ideas y la reflexión clínica conjunta. Un espacio cuidado y de calidad para aprender de la mano de otros profesionales y estudiantes avanzados.",
      howItWorks: "Se fija una fecha mensual para el encuentro, al que pueden sumarse estudiantes avanzados y profesionales psicólogos. La participación puede ser presentando un caso o asistiendo como oyente, favoreciendo el intercambio y la reflexión clínica conjunta. Los cupos son limitados para garantizar un espacio cuidado y de calidad.",
      cta: "whatsapp",
      ctaLabel: "Consultar disponibilidad y aranceles",
    },
  ],
  nosotros: {
    image: "/images/Nosotros.jpeg", 
    title: "Nuestra historia",
    text: `Paideia nació hace algunos años a partir de un sueño compartido entre amigas: crear un espacio de salud mental que concientizara, acompañara y acercara la terapia a quienes sentían la necesidad de empezar, pero no sabían cómo o con quién.

Con el tiempo, ese sueño fue creciendo y se transformó en una red que conecta a las personas con el profesional que mejor se adapta a sus necesidades, entendiendo que cada proceso es único y merece un acompañamiento personalizado.

Al mismo tiempo, Paideia surge desde la convicción de que la clínica no tiene por qué ser un camino solitario. Por eso, también ofrecemos un espacio de escucha, intercambio y acompañamiento para profesionales de la psicología, fortaleciendo el trabajo en red y el cuidado de quienes cuidan.

Trabajamos desde un enfoque cognitivo-conductual, con una mirada integral de la persona, contemplando su historia, contexto, emociones y vínculos, para promover procesos de cambio reales y sostenibles.`
  },
  contact: {
    title: "Contáctanos",
    subtitle: "Estaremos encantados de acompañarte",
    formFields: [
      { 
        name: "fullName", 
        label: "Nombre y apellido", 
        type: "text", 
        required: true 
      },
      { 
        name: "phone", 
        label: "Número de teléfono (WhatsApp)", 
        type: "tel", 
        required: true 
      },
      { 
        name: "email", 
        label: "Correo electrónico", 
        type: "email", 
        required: true 
      },
      { 
        name: "age", 
        label: "Edad", 
        type: "number", 
        required: true 
      },
      { 
        name: "servicio", 
        label: "¿Qué servicio de Paideia te interesa consultar?", 
        type: "select", 
        required: true,
        options: [
          { value: "", label: "Selecciona un servicio" },
          { value: "Terapia individual", label: "Terapia individual" },
          { value: "Orientación vocacional", label: "Orientación vocacional" },
          { value: "Supervisión individual", label: "Supervisión individual" },
          { value: "Supervisión grupal", label: "Supervisión grupal" },
        ]
      },
      { 
        name: "mensaje", 
        label: "Contanos, con tus propias palabras, qué te trae a consultar y qué estás buscando en este espacio", 
        type: "textarea", 
        required: true 
      },
    ],
  },
};

