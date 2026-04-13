import { createAppointment, appendToSheet } from "../lib/googleCalendar.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ status: "webhook activo" });
  }

  try {
    const rawBody = await getRawBody(req);
    let body = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch(e) {
      const params = new URLSearchParams(rawBody);
      body = Object.fromEntries(params);
    }

    console.log("Body recibido:", JSON.stringify(body));

    if (!body.type && !body.action) {
      return res.status(200).json({ received: true });
    }

    const esPayment = body.type === "payment" || body.action?.startsWith("payment");
    if (!esPayment) {
      return res.status(200).json({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) return res.status(200).json({ received: true });

    console.log("Consultando pago:", paymentId);

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const paymentData = await response.json();
    console.log("Status pago:", paymentData.status);
    console.log("Metadata:", JSON.stringify(paymentData.metadata));

    if (paymentData.status !== "approved") {
      return res.status(200).json({ received: true, status: paymentData.status });
    }

    const { patient_name, patient_email, patient_phone, slot_start, slot_end } = paymentData.metadata;

    await createAppointment({
      patientName: patient_name,
      patientEmail: patient_email,
      startTime: slot_start,
      endTime: slot_end,
    });

    await appendToSheet({
      nombre: patient_name,
      email: patient_email,
      telefono: patient_phone || "",
      turno: new Date(slot_start).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        weekday: "long", day: "numeric", month: "long",
        hour: "2-digit", minute: "2-digit",
      }),
    });

    console.log(`✅ Turno creado: ${patient_name}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(200).json({ received: true, error: error.message });
  }
}