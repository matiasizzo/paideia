// lib/googleCalendar.js
import { google } from "googleapis";

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

export async function getOccupiedSlots(days = 60) {
  const calendar = getCalendarClient();
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
  const calendar = getCalendarClient();

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