import { getOccupiedSlots } from "../lib/googleCalendar.js";

const WORKING_HOURS = { start: 9, end: 18 };
const SESSION_DURATION = 30;
const WORKING_DAYS = [1, 2, 3, 4, 5];

function generateAllSlots(days = 60) {
  const slots = [];
  const now = new Date();

  for (let d = 1; d <= days; d++) {
    // Crear fecha en horario argentino
    const date = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
    date.setDate(date.getDate() + d);
    date.setHours(0, 0, 0, 0);

    if (!WORKING_DAYS.includes(date.getDay())) continue;

    for (let h = WORKING_HOURS.start; h < WORKING_HOURS.end; h++) {
      for (let m = 0; m < 60; m += SESSION_DURATION) {
        // Construir la fecha en Argentina y convertir a ISO
        const argStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
        
        // Convertir hora argentina a UTC
        const startArg = new Date(new Date(argStr).toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
        const offsetMs = new Date(argStr) - startArg;
        const startUTC = new Date(new Date(argStr).getTime() + offsetMs);
        const endUTC = new Date(startUTC.getTime() + SESSION_DURATION * 60000);

        slots.push({ 
          start: startUTC.toISOString(), 
          end: endUTC.toISOString() 
        });
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