// api/crear-pago.js
import { Preference } from "mercadopago";
import { mpClient } from "../lib/mercadopago.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { nombre, email, telefono, slotStart, slotEnd } = req.body;
    if (!nombre || !email || !slotStart || !slotEnd) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const startDate = new Date(slotStart);
    const fechaFormateada = startDate.toLocaleDateString("es-AR", {
      weekday: "long", day: "numeric", month: "long",
    });
    const horaFormateada = startDate.toLocaleTimeString("es-AR", {
      hour: "2-digit", minute: "2-digit",
    });

    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: [
          {
            id: "entrevista-inicial",
            title: "Entrevista inicial — Paideia",
            description: `Turno: ${fechaFormateada} a las ${horaFormateada}`,
            quantity: 1,
            unit_price: 10000, // ← cambiar por el precio real en ARS
            currency_id: "ARS",
          },
        ],
        payer: {
          name: nombre,
          email: email,
        },
        metadata: {
          patient_name: nombre,
          patient_email: email,
          patient_phone: telefono,
          slot_start: slotStart,
          slot_end: slotEnd,
        },
          back_urls: {
            success: `https://www.terapiapaideia.com/pago/exito?nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}&fecha=${encodeURIComponent(fechaFormateada + " a las " + horaFormateada)}`,
            failure: `https://www.terapiapaideia.com/pago/error`,
            pending: `https://www.terapiapaideia.com/pago/pendiente`,
        },
        auto_return: "approved",
        notification_url: `https://www.terapiapaideia.com/api/webhook`,
      },
    });

res.status(200).json({
  preferenceId: result.id,
  initPoint: result.init_point,
  notificationUrl: result.notification_url,
});
  } catch (error) {
    console.error("Error creando preferencia:", error);
    res.status(500).json({ error: "Error al crear el pago" });
  }
}