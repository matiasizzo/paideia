import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
}

export async function getOccupiedSlots(days = 60) {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + days);

  const response = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: now.toISOString(),
    timeMax: future.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return response.data.items.map((e) => ({
    start: e.start.dateTime,
    end: e.end.dateTime,
  }));
}

export async function createAppointment({ patientName, patientEmail, startTime, endTime }) {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    sendUpdates: "none",
    requestBody: {
      summary: `Entrevista inicial — ${patientName}`,
      description: `Paciente: ${patientName}\nEmail: ${patientEmail}\nReservado desde paideia.com`,
      start: { dateTime: startTime, timeZone: "America/Argentina/Buenos_Aires" },
      end: { dateTime: endTime, timeZone: "America/Argentina/Buenos_Aires" },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 },
          { method: "popup", minutes: 30 },
        ],
      },
    },
  });

  return event.data;
}

export async function appendToSheet({ nombre, email, telefono, turno }) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: "1bVCZzizc6B7unfZf0rXBgwtJZZGmVq1Bm2PaeDtylI0",
    range: "Hoja 1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }),
          nombre,
          email,
          telefono,
          turno,
          "Pendiente",
        ],
      ],
    },
  });
}