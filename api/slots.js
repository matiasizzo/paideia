// api/slots.js
import { getOccupiedSlots } from "../lib/googleCalendar.js";

// Configuración: ajustar a los horarios reales de Paideia
const WORKING_HOURS = { start: 9, end: 18 }; // 9:00 a 18:00 hs
const SESSION_DURATION = 30; // minutos
const WORKING_DAYS = [1, 2, 3, 4, 5]; // Lunes a Viernes

function generateAllSlots(days = 14) {
  const slots = [];
  const now = new Date();

  for (let d = 1; d <= days; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d);
    date.setHours(0, 0, 0, 0);
    if (!WORKING_DAYS.includes(date.getDay())) continue;

    for (let h = WORKING_HOURS.start; h < WORKING_HOURS.end; h++) {
      for (let m = 0; m < 60; m += SESSION_DURATION) {
        const start = new Date(date);
        start.setHours(h, m, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + SESSION_DURATION);
        slots.push({ start: start.toISOString(), end: end.toISOString() });
    }
}
  }
  return slots;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const occupied = await getOccupiedSlots(60);
    const allSlots = generateAllSlots(60);

    const available = allSlots.filter((slot) => {
      return !occupied.some((busy) => {
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    res.status(200).json({ slots: available });
  } catch (error) {
    console.error("Error obteniendo slots:", error);
    res.status(500).json({ error: "Error al obtener turnos" });
  }
}