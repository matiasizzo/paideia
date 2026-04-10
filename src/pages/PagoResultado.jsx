import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function PagoResultado({ status }) {
  const [searchParams] = useSearchParams();
  const emailEnviado = useRef(false);

  useEffect(() => {
    if (status === "success" && !emailEnviado.current) {
      emailEnviado.current = true;

      const nombre = searchParams.get("nombre") || "";
      const email = searchParams.get("email") || "";
      const fecha = searchParams.get("fecha") || "";

      if (email) {
        emailjs.init("qnha6sOiLTKZqwC0s");
        emailjs.send(
          "service_5zrened",
          "template_24w2mxf",
          {
            patient_name: nombre,
            patient_email: email,
            slot_fecha: fecha,
          }
        ).then(() => {
          console.log("✅ Email de confirmación enviado");
        }).catch((err) => {
          console.error("❌ Error enviando email:", err);
        });
      }
    }
  }, [status]);

  const msg = {
    success: {
      icono: "✅",
      titulo: "¡Turno confirmado!",
      texto: "Te enviamos un email con los detalles de tu entrevista. ¡Nos vemos pronto!",
    },
    failure: {
      icono: "❌",
      titulo: "El pago no se procesó",
      texto: "Hubo un problema. Podés intentarlo de nuevo.",
    },
    pending: {
      icono: "⏳",
      titulo: "Pago pendiente",
      texto: "Te avisaremos por email cuando se confirme.",
    },
  }[status] || { icono: "⏳", titulo: "Procesando...", texto: "" };

  return (
    <div className="min-h-screen bg-paideia-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">{msg.icono}</div>
        <h1 className="text-2xl font-bold font-raleway mb-3 text-paideia-primary">
          {msg.titulo}
        </h1>
        <p className="text-paideia-primary/70 font-raleway mb-8">{msg.texto}</p>
        <Link
          to="/"
          className="inline-block bg-paideia-primary text-white font-raleway font-bold px-8 py-3 rounded-lg"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}